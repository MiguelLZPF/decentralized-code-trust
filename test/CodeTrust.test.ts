import { GAS_OPT, KEYSTORE, TEST } from "configuration";
import * as HRE from "hardhat";
import { step } from "mocha-steps";
import { expect } from "chai";
import { ContractReceipt, Wallet } from "ethers";
import { TransactionReceipt, Block, JsonRpcProvider } from "@ethersproject/providers";
import { Mnemonic, isAddress } from "ethers/lib/utils";
import { generateWallets } from "scripts/wallets";
import { ADDR_ZERO, delay, getContractInstance, setGlobalHRE } from "scripts/utils";
import { INetwork } from "models/Configuration";
import { deploy } from "scripts/deploy";
import { DumbExample, ICodeTrust } from "typechain-types";

// Specific Constants
const CONTRACT_NAME = "CodeTrust";
const CODETRUST_DEPLOYED_AT = undefined;
const REVERT_MESSAGES = {
  trustCodeAt: {
    paramDuration: "Invalid duration, check Doc",
  },
};

// General Variables
let provider: JsonRpcProvider;
let network: INetwork;
let accounts: Wallet[];
let lastReceipt: ContractReceipt | TransactionReceipt;
let lastBlock: Block;
// Specific Variables
// -- wallets | accounts
let admin: Wallet;
let defaultUser: Wallet;
// -- contracts
let codeTrust: ICodeTrust;
let dumbContract: DumbExample;

describe("CodeTrust", () => {
  before("Generate test Accounts", async () => {
    ({ gProvider: provider, gNetwork: network } = await setGlobalHRE(HRE));
    lastBlock = await provider.getBlock("latest");
    console.log(`Connected to network: ${network.name} (latest block: ${lastBlock.number})`);
    // Generate TEST.accountNumber wallets
    accounts = await generateWallets(
      undefined,
      undefined,
      TEST.accountNumber,
      undefined,
      {
        phrase: KEYSTORE.default.mnemonic.phrase,
        path: KEYSTORE.default.mnemonic.basePath,
        locale: KEYSTORE.default.mnemonic.locale,
      } as Mnemonic,
      true
    );
    // set specific roles
    admin = accounts[0];
    defaultUser = accounts[1];
  });

  describe("Deployment and Initialization", () => {
    if (CODETRUST_DEPLOYED_AT) {
      step("Should create contract instance", async () => {
        codeTrust = (await getContractInstance(CONTRACT_NAME, admin)) as ICodeTrust;
        expect(isAddress(codeTrust.address)).to.be.true;
        expect(codeTrust.address).to.equal(CODETRUST_DEPLOYED_AT);
        console.log(`${CONTRACT_NAME} recovered at: ${codeTrust.address}`);
      });
    } else {
      step("Should deploy contract", async () => {
        const deployResult = await deploy(CONTRACT_NAME, admin, [], undefined, GAS_OPT.max, false);
        codeTrust = deployResult.contractInstance as ICodeTrust;
        expect(isAddress(codeTrust.address)).to.be.true;
        expect(codeTrust.address).not.to.equal(ADDR_ZERO);
        console.log(`NEW ${CONTRACT_NAME} deployed at: ${codeTrust.address}`);
      });
      // step("Should check if correct initialization", async () => {
      //   const response = await storage.retrieve();
      //   expect(response).equal(INIT_VALUE);
      // });
    }

    step("Should deploy DumbExample contract", async () => {
      const deployResult = await deploy(
        "DumbExample",
        admin,
        [codeTrust.address],
        undefined,
        GAS_OPT.max,
        false
      );
      dumbContract = deployResult.contractInstance as DumbExample;
      expect(isAddress(dumbContract.address)).to.be.true;
      expect(dumbContract.address).not.to.equal(ADDR_ZERO);
      console.log(`NEW DumbExample deployed at: ${dumbContract.address}`);
    });
  });

  describe("EOA trusts code", () => {
    it("Should FAIL to trust without duration", async () => {
      expect(codeTrust.trustCodeAt(codeTrust.address, 0, GAS_OPT.max)).to.be.rejectedWith(
        REVERT_MESSAGES.trustCodeAt.paramDuration
      );
    });
    it("Should FAIL to trust with duration less than 10 seconds", async () => {
      expect(codeTrust.trustCodeAt(codeTrust.address, 9, GAS_OPT.max)).to.be.rejectedWith(
        REVERT_MESSAGES.trustCodeAt.paramDuration
      );
    });
    it("Should FAIL to trust with duration greater than 1 year", async () => {
      expect(codeTrust.trustCodeAt(codeTrust.address, 31536001, GAS_OPT.max)).to.be.rejectedWith(
        REVERT_MESSAGES.trustCodeAt.paramDuration
      );
    });
    step("Should set trust on contract", async () => {
      let trusted = await codeTrust.isTrustedCode(
        codeTrust.address,
        ADDR_ZERO,
        Math.floor(Date.now() / 1000)
      );
      expect(trusted).to.be.false;
      // trust code at
      lastReceipt = await (
        await codeTrust.trustCodeAt(codeTrust.address, 60 * 60, GAS_OPT.max)
      ).wait();
      trusted = await codeTrust.isTrustedCode(
        codeTrust.address,
        ADDR_ZERO,
        Math.floor(Date.now() / 1000)
      );
      expect(trusted).to.be.true;
    });
    step("Should untrust a previously trusted contract", async () => {
      let trusted = await codeTrust.isTrustedCode(
        codeTrust.address,
        ADDR_ZERO,
        Math.floor(Date.now() / 1000)
      );
      expect(trusted).to.be.true;
      // UNtrust code at
      lastReceipt = await (await codeTrust.untrustCodeAt(codeTrust.address, GAS_OPT.max)).wait();
      trusted = await codeTrust.isTrustedCode(
        codeTrust.address,
        ADDR_ZERO,
        Math.floor(Date.now() / 1000)
      );
      expect(trusted).to.be.false;
    });

    step("Should untrust a previously trusted contract by TIMEOUT", async () => {
      let trusted = await codeTrust.isTrustedCode(
        codeTrust.address,
        ADDR_ZERO,
        Math.floor(Date.now() / 1000)
      );
      expect(trusted).to.be.false;
      // trust code at
      lastReceipt = await (await codeTrust.trustCodeAt(codeTrust.address, 10, GAS_OPT.max)).wait();
      trusted = await codeTrust.isTrustedCode(
        codeTrust.address,
        ADDR_ZERO,
        Math.floor(Date.now() / 1000)
      );
      expect(trusted).to.be.true;
      await delay(16000);
      trusted = await codeTrust.isTrustedCode(
        codeTrust.address,
        ADDR_ZERO,
        Math.floor(Date.now() / 1000)
      );
      expect(trusted).to.be.false;
    });
  });

  describe("Code trusts another code", () => {
    step("Should set trust on contract without duration", async () => {
      let trusted = await codeTrust.isTrustedCode(
        codeTrust.address,
        dumbContract.address,
        Math.floor(Date.now() / 1000)
      );
      expect(trusted).to.be.false;
      // from contract
      trusted = await dumbContract.checkIfTrusted(codeTrust.address);
      expect(trusted).to.be.false;
      // trust code at
      lastReceipt = await (
        await dumbContract.trustOneContract(codeTrust.address, GAS_OPT.max)
      ).wait();
      trusted = await codeTrust.isTrustedCode(
        codeTrust.address,
        dumbContract.address,
        Math.floor(Date.now() / 1000)
      );
      expect(trusted).to.be.true;
      // from contract
      trusted = await dumbContract.checkIfTrusted(codeTrust.address);
      expect(trusted).to.be.true;
    });
  });
});
