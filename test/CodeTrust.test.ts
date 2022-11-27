import { expect } from "chai";
import { step } from "mocha-steps";
import * as HRE from "hardhat";
import { Wallet, ContractReceipt } from "ethers";
import { GAS_OPT, KEYSTORE, TEST } from "../configuration";
import {
  CodeTrust__factory,
  DumbExample,
  DumbExample__factory,
  ICodeTrust,
} from "../typechain-types";
import { ADDR_ZERO, delay, setGlobalHRE } from "../scripts/utils";
import { generateWalletBatch } from "../scripts/wallets";
import { INetwork } from "../models/Deploy";
import { Block, JsonRpcProvider } from "@ethersproject/providers";
import { Mnemonic } from "ethers/lib/utils";
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";

let ethers = HRE.ethers;
let provider: JsonRpcProvider;
let network: INetwork;

const REVERT_MESSAGES = {
  trustCodeAt: {
    paramDuration: "Invalid duration, check Doc",
  },
};

let accounts: Wallet[];

let codeTrustFactory: CodeTrust__factory;
let dumbExampleFactory: DumbExample__factory;

let codeTrust: ICodeTrust;
let dumbContract: DumbExample;

let lastReceipt: ContractReceipt;
let lastBlock: Block;

describe("CodeTrust", () => {
  before("Init provider, network and wallets", async () => {
    ({ gProvider: provider, gCurrentNetwork: network } = await setGlobalHRE(HRE));
    lastBlock = await provider.getBlock("latest");
    console.log(`Connected to network: ${network.name} (latest block: ${lastBlock.number})`);
    // Generate TEST.accountNumber wallets
    accounts = await generateWalletBatch(
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
  });

  describe("Deployment", () => {
    step("Should deploy CodeTrust contract", async () => {
      codeTrustFactory = await ethers.getContractFactory("CodeTrust", accounts[0]);
      codeTrust = await codeTrustFactory.deploy(GAS_OPT.max);
      lastReceipt = await codeTrust.deployTransaction.wait();
      expect(ethers.utils.isAddress(codeTrust.address)).to.be.true;
      expect(lastReceipt.contractAddress).to.equal(codeTrust.address);
    });
    step("Should deploy CommunityManager contract", async () => {
      dumbExampleFactory = await ethers.getContractFactory("DumbExample", accounts[0]);
      dumbContract = await dumbExampleFactory.deploy(codeTrust.address, GAS_OPT.max);
      lastReceipt = await dumbContract.deployTransaction.wait();
      expect(ethers.utils.isAddress(dumbContract.address)).to.be.true;
      expect(lastReceipt.contractAddress).to.equal(dumbContract.address);
    });
  });

  describe("EOA trusts code", () => {
    it("Should FAIL to trust without duration", async () => {
      await expect(codeTrust.trustCodeAt(codeTrust.address, 0, GAS_OPT.max)).to.be.revertedWith(
        REVERT_MESSAGES.trustCodeAt.paramDuration
      );
    });
    it("Should FAIL to trust with duration less than 10 seconds", async () => {
      await expect(codeTrust.trustCodeAt(codeTrust.address, 9, GAS_OPT.max)).to.be.revertedWith(
        REVERT_MESSAGES.trustCodeAt.paramDuration
      );
    });
    it("Should FAIL to trust with duration greater than 1 year", async () => {
      await expect(
        codeTrust.trustCodeAt(codeTrust.address, 31536001, GAS_OPT.max)
      ).to.be.revertedWith(REVERT_MESSAGES.trustCodeAt.paramDuration);
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
