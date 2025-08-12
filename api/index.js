import app from '../server.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

// connect to MongoDB then start server
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('MongoDB connect error:', err);
        app.listen(PORT, () => console.log(`Server running on port ${PORT} (DB not connected)`));
    });