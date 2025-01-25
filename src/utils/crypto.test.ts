import {  isValidAddressPolkadotAddress } from './crypto';

jest.mock('@polkadot/util-crypto', () => ({
  ...jest.requireActual('@polkadot/util-crypto'),
  signatureVerify: jest.fn(),
}));

describe('Polkadot Utils', () => {
  describe('isValidAddressPolkadotAddress', () => {
    it('should return true for a valid Polkadot address', () => {
      const result = isValidAddressPolkadotAddress('5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty');
      expect(result).toBe(true);
    });

    it('should return false for an invalid Polkadot address', () => {
      const result = isValidAddressPolkadotAddress('invalid');
      expect(result).toBe(false);
    });
  });
});
