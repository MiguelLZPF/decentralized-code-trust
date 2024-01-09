import { GAS_OPT, KEYSTORE, TEST } from "configuration";
import * as HRE from "hardhat";
import { step } from "mocha-steps";
import { expect } from "chai";
import { ContractReceipt, Wallet } from "ethers";
import {
  TransactionReceipt,
  Block,
  JsonRpcProvider,
} from "@ethersproject/providers";
import { Mnemonic, isAddress } from "ethers/lib/utils";
import { generateWallets } from "scripts/wallets";
import {
  ADDR_ZERO,
  delay,
  getContractInstance,
  setGlobalHRE,
} from "scripts/utils";
import { INetwork } from "models/Configuration";
import { deploy } from "scripts/deploy";
import { ICodeTrust, TrustedExample, TrusterExample } from "typechain-types";

// Specific Constants
const CONTRACT_NAME = "CodeTrust";
const CODETRUST_DEPLOYED_AT = undefined;
const REVERT_MESSAGES = {
  codeTrust: {
    paramDuration: "Invalid duration, check Doc",
  },
  truster: {
    notTrusted: "Not trusted code",
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
let trustedExample: TrustedExample;
let trusterExample: TrusterExample;

describe("CodeTrust", () => {
  before("Generate test Accounts", async () => {
    ({ gProvider: provider, gNetwork: network } = await setGlobalHRE(HRE));
    lastBlock = await provider.getBlock("latest");
    console.log(
      `Connected to network: ${network.name} (latest block: ${lastBlock.number})`
    );
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
        codeTrust = (await getContractInstance(
          CONTRACT_NAME,
          admin
        )) as ICodeTrust;
        expect(isAddress(codeTrust.address)).to.be.true;
        expect(codeTrust.address).to.equal(CODETRUST_DEPLOYED_AT);
        console.log(`${CONTRACT_NAME} recovered at: ${codeTrust.address}`);
      });
    } else {
      step("Should deploy contract", async () => {
        const deployResult = await deploy(
          CONTRACT_NAME,
          admin,
          [],
          undefined,
          GAS_OPT.max,
          false
        );
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

    step("Should deploy TrusterExample contract", async () => {
      const deployResult = await deploy(
        "TrusterExample",
        admin,
        [codeTrust.address],
        undefined,
        GAS_OPT.max,
        false
      );
      trusterExample = deployResult.contractInstance as TrusterExample;
      expect(isAddress(trusterExample.address)).to.be.true;
      expect(trusterExample.address).not.to.equal(ADDR_ZERO);
      console.log(`NEW TrusterExample deployed at: ${trusterExample.address}`);
    });

    step("Should deploy TrustedExample contract", async () => {
      const deployResult = await deploy(
        "TrustedExample",
        admin,
        [],
        undefined,
        GAS_OPT.max,
        false
      );
      trustedExample = deployResult.contractInstance as TrustedExample;
      expect(isAddress(trustedExample.address)).to.be.true;
      expect(trustedExample.address).not.to.equal(ADDR_ZERO);
      console.log(`NEW TrustedExample deployed at: ${trustedExample.address}`);
    });
  });

  describe("EOA trusts code", () => {
    it("Should FAIL to trust without duration", async () => {
      expect(
        codeTrust.trustCodeAt(codeTrust.address, 0, GAS_OPT.max)
      ).to.be.rejectedWith(REVERT_MESSAGES.codeTrust.paramDuration);
    });
    it("Should FAIL to trust with duration less than 10 seconds", async () => {
      expect(
        codeTrust.trustCodeAt(codeTrust.address, 9, GAS_OPT.max)
      ).to.be.rejectedWith(REVERT_MESSAGES.codeTrust.paramDuration);
    });
    it("Should FAIL to trust with duration greater than 1 year", async () => {
      expect(
        codeTrust.trustCodeAt(codeTrust.address, 31536001, GAS_OPT.max)
      ).to.be.rejectedWith(REVERT_MESSAGES.codeTrust.paramDuration);
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
      lastReceipt = await (
        await codeTrust.untrustCodeAt(codeTrust.address, GAS_OPT.max)
      ).wait();
      trusted = await codeTrust.isTrustedCode(
        codeTrust.address,
        ADDR_ZERO,
        Math.floor(Date.now() / 1000)
      );
      expect(trusted).to.be.false;
    });

    step(
      "Should untrust a previously trusted contract by TIMEOUT",
      async () => {
        let trusted = await codeTrust.isTrustedCode(
          codeTrust.address,
          ADDR_ZERO,
          Math.floor(Date.now() / 1000)
        );
        expect(trusted).to.be.false;
        // trust code at
        lastReceipt = await (
          await codeTrust.trustCodeAt(codeTrust.address, 10, GAS_OPT.max)
        ).wait();
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
      }
    );
  });

  describe("Usage Example", () => {
    it("Should FAIL to be called from untrusted contract", async () => {
      expect(
        trustedExample.callContract(trusterExample.address, GAS_OPT.max)
      ).to.be.rejectedWith(REVERT_MESSAGES.truster.notTrusted);
    });
    step("Should set trust on contract", async () => {
      let isTrusted = await codeTrust.isTrustedCode(
        trustedExample.address,
        trusterExample.address,
        Math.floor(Date.now() / 1000)
      );
      expect(isTrusted).to.be.false;
      // from contract
      isTrusted = await trusterExample.checkIfTrusted(trustedExample.address);
      expect(isTrusted).to.be.false;
      // trust code at
      lastReceipt = await (
        await trusterExample.trustOneContract(
          trustedExample.address,
          GAS_OPT.max
        )
      ).wait();
      isTrusted = await codeTrust.isTrustedCode(
        trustedExample.address,
        trusterExample.address,
        Math.floor(Date.now() / 1000)
      );
      expect(isTrusted).to.be.true;
      // from contract
      isTrusted = await trusterExample.checkIfTrusted(trustedExample.address);
      expect(isTrusted).to.be.true;
    });
    step("Should be called from trusted contract", async () => {
      // trust code at
      lastReceipt = await (
        await trustedExample.callContract(trusterExample.address, GAS_OPT.max)
      ).wait();
      expect(lastReceipt).not.to.be.undefined;
    });
  });
});
