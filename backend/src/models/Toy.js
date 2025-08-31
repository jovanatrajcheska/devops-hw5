import mongoose from 'mongoose';

const toySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    condition: { type: String, required: true },
    description: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Toy', toySchema);
