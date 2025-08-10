import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Cart from '../models/Cart.js';

const router = express.Router();

// ✅ عرض cart المستخدم
router.get('/', protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.json({ items: [] });
  res.json(cart);
});

// ✅ إضافة عنصر للـ cart
router.post('/add', protect, async (req, res) => {
  const { productId, name, price, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: [{ productId, name, price, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex(i => i.productId === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, quantity });
    }
  }

  await cart.save();
  res.status(200).json(cart);
});

// ✅ حذف عنصر من cart
router.post('/remove', protect, async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(item => item.productId !== productId);

  await cart.save();
  res.status(200).json(cart);
});

export default router;