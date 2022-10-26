//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./interfaces/ICodeTrust.sol";

/**
 * @title Trustable
 * @author Miguel Gomez Carpena
 * @notice inherit this contract to implement code trust framework
 */
abstract contract Trustable {
  ICodeTrust internal _codeTrust;
}
