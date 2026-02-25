import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connnectDb.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/auth', authRoutes);

connectDB().catch((err) => console.error('DB connect error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
