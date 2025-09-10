import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/healthGoal.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/health-goals', router);
app.get('/health', (_req, res) => res.json({ status: 'health-goal-service OK' }));
app.use(errorHandler);

const PORT = process.env.PORT || 4002;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/health-goal-service'

mongoose.connect(MONGO).then(() => {
  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`health-goal-service listening ${PORT}`));
  }
}).catch(err => { console.error(err); process.exit(1); });

export default app;
