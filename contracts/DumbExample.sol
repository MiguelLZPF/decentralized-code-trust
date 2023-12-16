//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0 <0.9.0;

import "./Truster.sol";

/**
 * @title Code Trust
 * @author Miguel Gomez Carpena
 */
contract DumbExample is Truster {
  constructor(ICodeTrust systemCodeTrust) {
    _codeTrust = systemCodeTrust;
  }

  function trustOneContract(address contractToTrust) public {
    _codeTrust.trustCodeAt(contractToTrust, 0);
  }

  function checkIfTrusted(address contractToCheck) public view returns (bool trusted) {
    return _codeTrust.isTrustedCode(contractToCheck, address(0), 0);
  }
}
