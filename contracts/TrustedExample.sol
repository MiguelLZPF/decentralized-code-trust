// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0 <0.9.0;

import "contracts/TrusterExample.sol";

/**
 * @title TrustedExample
 * @dev This contract demonstrates how to call a function in another contract.
 * It imports the "TrusterExample" contract and provides a function to call the "dumbFunction" in that contract.
 * @author Miguel Gomez Carpena
 */
contract TrustedExample {
  function callContract(address contractToCall) public {
    TrusterExample(contractToCall).dumbFunction(10);
  }
}
