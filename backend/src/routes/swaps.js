import { Router } from 'express';
import Swap from '../models/Swap.js';
import Toy from '../models/Toy.js';

const router = Router();

// Create swap request
router.post('/', async (req, res) => {
  try {
    const { fromUser, toUser, toyOffered, toyRequested, message } = req.body;
    const swap = await Swap.create({ fromUser, toUser, toyOffered, toyRequested, message });
    res.status(201).json(await swap.populate(['fromUser','toUser','toyOffered','toyRequested']));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// List swaps (by user)
router.get('/', async (req, res) => {
  const { userId } = req.query;
  const q = userId ? { $or: [{ fromUser: userId }, { toUser: userId }] } : {};
  const swaps = await Swap.find(q).sort({ createdAt: -1 })
    .populate(['fromUser','toUser','toyOffered','toyRequested']);
  res.json(swaps);
});

// Accept
router.patch('/:id/accept', async (req, res) => {
  const swap = await Swap.findById(req.params.id);
  if (!swap) return res.status(404).json({ error: 'Not found' });
  swap.status = 'accepted';
  await swap.save();
  
  // Mark both toys unavailable
  await Toy.findByIdAndUpdate(swap.toyOffered, { available: false });
  await Toy.findByIdAndUpdate(swap.toyRequested, { available: false });
  res.json(await swap.populate(['fromUser','toUser','toyOffered','toyRequested']));
});

// Decline
router.patch('/:id/decline', async (req, res) => {
  const swap = await Swap.findByIdAndUpdate(req.params.id, { status: 'declined' }, { new: true })
    .populate(['fromUser','toUser','toyOffered','toyRequested']);
  res.json(swap);
});

// Confirm pickup
router.patch('/:id/confirm-pickup', async (req, res) => {
  const swap = await Swap.findByIdAndUpdate(req.params.id, { status: 'picked_up' }, { new: true })
    .populate(['fromUser','toUser','toyOffered','toyRequested']);
  res.json(swap);
});

export default router;
