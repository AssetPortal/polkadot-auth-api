import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { isValidAddressPolkadotAddress, isValidPolkadotSignature } from "../utils/crypto";

interface VerifyRequest {
  message: string;
  address: string;
  signature: string;
}

export const verifySignature = (req: Request, res: Response): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ 
      ok: false,
      message: errors.array()[0].msg });
    return;
  }

  const { message, address, signature } = req.body as VerifyRequest;

  if (!message || !address || !signature) {
    res.status(400).json({
      ok: false,
      message: 'Invalid request. Message, address, and signature are required.',
    });
    return;
  }

  if (!isValidAddressPolkadotAddress(address)) {
    res.status(400).json({
      ok: false,
      message: 'Invalid Polkadot address',
    });
    return; 
  }
  try {
    const isValid = isValidPolkadotSignature(message, signature, address);
    if (isValid) {
      res.status(200).json({ ok: true, message: 'Signature is valid.' });
    } else {
      res.status(401).json({ ok: false, message: 'Signature is invalid.' });
    }
    return;
  } catch (error) {
    if (error instanceof Error && error.message && error.message.includes('Invalid signature length')) {
      res.status(400).json({ 
        ok: false,
        message: 'Invalid signature length' });
      return;
    }
    console.error('Verification error:', error);
    res.status(500).json({ 
      ok: false,
      message: 'Internal server error.' });
    return;
  }
};