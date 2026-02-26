import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connnectDb.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

connectDB().catch((err) => console.error('DB connect error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
