import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  qty:      { type: Number, required: true, min: 1 },
  adminId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items:    [orderItemSchema],
    status:   { type: String, enum: ['pending', 'approved', 'rejected', 'shipped', 'delivered'], default: 'pending' },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);