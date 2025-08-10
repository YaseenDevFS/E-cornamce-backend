import express from 'express';
import { protect, admin, protectAdmin } from '../middleware/authMiddleware.js';
import Product from '../models/Product.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();
// عرض جميع المنتجات بالصور
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

export default router;
