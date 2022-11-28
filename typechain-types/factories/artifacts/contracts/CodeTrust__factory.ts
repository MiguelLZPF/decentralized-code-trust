/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  CodeTrust,
  CodeTrustInterface,
} from "../../../artifacts/contracts/CodeTrust";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "by",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "extTimestamp",
        type: "uint256",
      },
    ],
    name: "isTrustedCode",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "trustedCode",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "trustCodeAt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedCode",
        type: "address",
      },
    ],
    name: "untrustCodeAt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610375806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80634f9402701461004657806383e5e6401461006d578063920517e614610082575b600080fd5b610059610054366004610298565b610095565b604051901515815260200160405180910390f35b61008061007b3660046102d4565b61010d565b005b6100806100903660046102ef565b6101b2565b6000816000036100a3574291505b6001600160a01b0383166100b5573392505b6001600160a01b038084166000908152602081815260408083209388168352929052205460018114806100f157506100ee836005610319565b81115b15610100576001915050610106565b60009150505b9392505050565b336000908152602081815260408083206001600160a01b038516845290915290205460018114806101475750610144426005610319565b81115b61018a5760405162461bcd60e51b815260206004820152600f60248201526e105b1c9958591e48195e1c1a5c9959608a1b60448201526064015b60405180910390fd5b50336000908152602081815260408083206001600160a01b0394909416835292905220429055565b32330361024a57600a81101580156101ce57506301e133808111155b61021a5760405162461bcd60e51b815260206004820152601b60248201527f496e76616c6964206475726174696f6e2c20636865636b20446f6300000000006044820152606401610181565b6102248142610319565b336000908152602081815260408083206001600160a01b03871684529091529020555050565b600381101561021a5750336000908152602081815260408083206001600160a01b039490941683529290522060019055565b80356001600160a01b038116811461029357600080fd5b919050565b6000806000606084860312156102ad57600080fd5b6102b68461027c565b92506102c46020850161027c565b9150604084013590509250925092565b6000602082840312156102e657600080fd5b6101068261027c565b6000806040838503121561030257600080fd5b61030b8361027c565b946020939093013593505050565b6000821982111561033a57634e487b7160e01b600052601160045260246000fd5b50019056fea26469706673582212208ab524fee756f2974b7befd5daa1af1a3158afefebdab53695bf47d7f7b26a4f64736f6c634300080d0033";

type CodeTrustConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CodeTrustConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CodeTrust__factory extends ContractFactory {
  constructor(...args: CodeTrustConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CodeTrust> {
    return super.deploy(overrides || {}) as Promise<CodeTrust>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CodeTrust {
    return super.attach(address) as CodeTrust;
  }
  override connect(signer: Signer): CodeTrust__factory {
    return super.connect(signer) as CodeTrust__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CodeTrustInterface {
    return new utils.Interface(_abi) as CodeTrustInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CodeTrust {
    return new Contract(address, _abi, signerOrProvider) as CodeTrust;
  }
}
