import express from 'express';
import { protect, admin, protectAdmin } from '../middleware/authMiddleware.js';
import Product from '../models/Product.js';
import upload from '../middleware/uploadMiddleware.js'; // ✅ استدعاء multer

const router = express.Router();

// ✅ إضافة منتج مع صورة
router.post(
  '/product/all',
  protectAdmin,
  admin,
  upload.single('file'), // ✅ استقبال ملف اسمه file
  async (req, res) => {
    const { name, price, description, category } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
      const product = new Product({
        name,
        price,
        description,
        image,
        category,
      });
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
);
// ✅ إضافة منتج Year-End
router.post('/product/year-end', protectAdmin, admin, async (req, res) => {
  const { name, price, description, image, category } = req.body;

  try {
    const product = new Product({ name, price, description, image, category: 'year-end' });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



export default router;