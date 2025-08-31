import { Router } from 'express';
import Toy from '../models/Toy.js';

const router = Router();

// Create 
router.post('/', async (req, res) => {
  try {
    const { name, condition, description, owner } = req.body;
    const toy = await Toy.create({ 
      name, 
      condition, 
      description, 
      owner,
      available: true  
    });
    res.status(201).json(toy);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// List 
router.get('/', async (req, res) => {
  try {
    const { owner } = req.query;
    const q = owner ? { owner } : {};
    const toys = await Toy.find(q)
      .populate('owner')
      .sort({ createdAt: -1 });
    res.json(toys);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Update 
router.patch('/:id', async (req, res) => {
  try {
    const toy = await Toy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(toy);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Delete 
router.delete('/:id', async (req, res) => {
  try {
    await Toy.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
