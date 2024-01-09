/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TrustedExample,
  TrustedExampleInterface,
} from "../../../artifacts/contracts/TrustedExample";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "contractToCall",
        type: "address",
      },
    ],
    name: "callContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060fd8061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806368874f1f14602d575b600080fd5b603c60383660046099565b603e565b005b6040516306a4c8db60e31b8152600a60048201526001600160a01b0382169063352646d890602401600060405180830381600087803b158015607f57600080fd5b505af11580156092573d6000803e3d6000fd5b5050505050565b60006020828403121560aa57600080fd5b81356001600160a01b038116811460c057600080fd5b939250505056fea264697066735822122048ac9dbec71059cca26c37566541a6d1b98b9b53d7e22d711246be2c342c176a64736f6c63430008130033";

type TrustedExampleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TrustedExampleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TrustedExample__factory extends ContractFactory {
  constructor(...args: TrustedExampleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TrustedExample> {
    return super.deploy(overrides || {}) as Promise<TrustedExample>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TrustedExample {
    return super.attach(address) as TrustedExample;
  }
  override connect(signer: Signer): TrustedExample__factory {
    return super.connect(signer) as TrustedExample__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TrustedExampleInterface {
    return new utils.Interface(_abi) as TrustedExampleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TrustedExample {
    return new Contract(address, _abi, signerOrProvider) as TrustedExample;
  }
}
