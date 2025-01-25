import { Router } from 'express';
import { healthCheck } from '../controllers/healthController';

const router = Router();


/**
 * Health check route to verify if the API is up and running.
 * 
 * @route GET /health
 * @returns {string} "ok" if the service is healthy.
 */
router.get('/health', healthCheck);

export default router;
