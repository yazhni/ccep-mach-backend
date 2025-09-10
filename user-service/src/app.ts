import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.get('/health', (_req, res) => res.json({ status: 'user-service OK' }));
app.use(errorHandler);

const PORT = process.env.PORT || 4001;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/user-service'
console.log('MONGO: ', MONGO);

mongoose.connect(MONGO).then(() => {
  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`user-service listening ${PORT}`));
  }
}).catch(err => { console.error(err); process.exit(1); });

export default app;
