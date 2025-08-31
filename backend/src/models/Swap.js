import mongoose from 'mongoose';

const swapSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUser:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toyOffered:   { type: mongoose.Schema.Types.ObjectId, ref: 'Toy', required: true },
  toyRequested: { type: mongoose.Schema.Types.ObjectId, ref: 'Toy', required: true },
  message: String,
  status: { type: String, enum: ['pending', 'accepted', 'declined', 'picked_up'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Swap', swapSchema);
