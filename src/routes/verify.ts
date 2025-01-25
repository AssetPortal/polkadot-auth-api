import { Router } from 'express';
import { verifyValidationRules } from '../middleware/validation';
import { verifySignature } from '../controllers/verifyController';

const router = Router();

/**
 * Verifies the provided Polkadot signature for a message and address.
 * 
 * @route POST /verify
 * @param {string} message - The message that has been signed.
 * @param {string} address - The Polkadot address associated with the signature.
 * @param {string} signature - The signature to verify.
 * @returns {object} JSON response with ok or error message.
 * @throws {400} Invalid request if validation fails.
 * @throws {500} Internal server error if something goes wrong during signature verification.
 */
router.post('/verify', verifyValidationRules, verifySignature);

export default router;
