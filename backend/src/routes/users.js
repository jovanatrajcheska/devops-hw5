import { Router } from 'express';
import User from '../models/User.js';

const router = Router();

// Create 
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// List 
router.get('/', async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

router.get('/', async (_req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 }) 
      .select('_id name'); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
