/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  DumbExample,
  DumbExampleInterface,
} from "../../../artifacts/contracts/DumbExample";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ICodeTrust",
        name: "systemCodeTrust",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractToCheck",
        type: "address",
      },
    ],
    name: "checkIfTrusted",
    outputs: [
      {
        internalType: "bool",
        name: "trusted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractToTrust",
        type: "address",
      },
    ],
    name: "trustOneContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161027f38038061027f83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b6101ec806100936000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806349dbfe821461003b57806375c29b4d14610062575b600080fd5b61004e610049366004610164565b610077565b604051901515815260200160405180910390f35b610075610070366004610164565b6100fa565b005b600080546040516304f9402760e41b81526001600160a01b038481166004830152602482018490526044820184905290911690634f94027090606401602060405180830381865afa1580156100d0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100f49190610194565b92915050565b600080546040516349028bf360e11b81526001600160a01b038481166004830152602482019390935291169063920517e690604401600060405180830381600087803b15801561014957600080fd5b505af115801561015d573d6000803e3d6000fd5b5050505050565b60006020828403121561017657600080fd5b81356001600160a01b038116811461018d57600080fd5b9392505050565b6000602082840312156101a657600080fd5b8151801515811461018d57600080fdfea26469706673582212200d0b0f29558008d495166fff2aa7d9ad1b66c5ea8a7e11a2102faad2fc45f25064736f6c63430008130033";

type DumbExampleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DumbExampleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DumbExample__factory extends ContractFactory {
  constructor(...args: DumbExampleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    systemCodeTrust: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DumbExample> {
    return super.deploy(
      systemCodeTrust,
      overrides || {}
    ) as Promise<DumbExample>;
  }
  override getDeployTransaction(
    systemCodeTrust: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(systemCodeTrust, overrides || {});
  }
  override attach(address: string): DumbExample {
    return super.attach(address) as DumbExample;
  }
  override connect(signer: Signer): DumbExample__factory {
    return super.connect(signer) as DumbExample__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DumbExampleInterface {
    return new utils.Interface(_abi) as DumbExampleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DumbExample {
    return new Contract(address, _abi, signerOrProvider) as DumbExample;
  }
}
