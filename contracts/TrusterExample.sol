//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0 <0.9.0;

import "./Truster.sol";

/**
 * @title TrusterExample
 * @dev A contract that extends the Truster contract and provides functionality to trust and check the trust status of other contracts.
 * @author Miguel Gomez Carpena
 */
contract TrusterExample is Truster {
  uint256 public someValue;

  /**
   * @dev Constructor that sets the code trust system.
   * @param systemCodeTrust The address of the code trust system.
   */
  constructor(ICodeTrust systemCodeTrust) {
    _codeTrust = systemCodeTrust;
  }

  function dumbFunction(uint256 value) public onlyTrustedCode {
    someValue = value;
  }

  /**
   * @dev Trusts a specific contract by calling the trustCodeAt function of the code trust system.
   * @param contractToTrust The address of the contract to trust.
   */
  function trustOneContract(address contractToTrust) public {
    _codeTrust.trustCodeAt(contractToTrust, 0);
  }

  /**
   * @dev Checks if a specific contract is trusted by calling the isTrustedCode function of the code trust system.
   * @param contractToCheck The address of the contract to check.
   * @return trusted A boolean indicating whether the contract is trusted or not.
   */
  function checkIfTrusted(address contractToCheck) public view returns (bool trusted) {
    return _codeTrust.isTrustedCode(contractToCheck, address(0), 0);
  }
}
