import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js';
import productRoute from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import path from 'path';
import checkoutRoutes from './routes/checkout.js';
const app = express();
dotenv.config();


app.use(cors({
  origin: "https://e-cornamce-frontend.vercel.app"
}));
app.use(express.json());

// لتفعيل مجلد الصور
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

app.use('/api/users', userRoute); 
app.use('/api/admin', adminRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api', checkoutRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});