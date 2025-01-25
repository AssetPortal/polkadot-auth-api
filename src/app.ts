import express from 'express';
import verifyRoutes from './routes/verify';
import healthRoutes from './routes/health';
import { initPolkadotCrypto } from './utils/crypto';

const app = express();

app.use(express.json());

app.use(healthRoutes);
app.use(verifyRoutes);

initPolkadotCrypto();

export default app;
