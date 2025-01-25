import { cryptoWaitReady, signatureVerify } from '@polkadot/util-crypto';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import { u8aToHex, isHex, hexToU8a } from '@polkadot/util';

export const initPolkadotCrypto = async () => {
  try {
    await cryptoWaitReady();
    console.log('Polkadot crypto initialized.');
  } catch (error) {
    console.error('Error initializing Polkadot crypto:', error);
    process.exit(1);
  }
};

/**
 * Verifies the signature for a given message, signature, and address.
 * @param signedMessage - The signed message.
 * @param signature - The signature to verify.
 * @param address - The address associated with the signature.
 * @returns boolean - True if the signature is valid, otherwise false.
 */
export const isValidPolkadotSignature = (signedMessage: string, signature: string, address: string): boolean => {
  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);

  return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
};

/**
 * Verifies if the provided address is a valid Polkadot address.
 * @param address - The address to verify.
 * @returns boolean - True if the address is valid, otherwise false.
 */
export const isValidAddressPolkadotAddress = (address: string): boolean => {
  try {
    encodeAddress(
      isHex(address)
        ? hexToU8a(address)
        : decodeAddress(address)
    );

    return true;
  } catch (error) {
    console.error('Error validating Polkadot address:', error);
    return false;
  }
};