import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import userRoute from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js';
import productRoute from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import checkoutRoutes from './routes/checkout.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: "https://e-cornamce-frontend.vercel.app"
}));
app.use(express.json());

// static folder
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

// routes
app.use('/api/users', userRoute); 
app.use('/api/admin', adminRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api', checkoutRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

export default app;