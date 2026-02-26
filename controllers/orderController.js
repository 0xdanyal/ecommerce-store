import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// POST /api/orders
// Customer places an order
export const placeOrder = async (req, res) => {
  try {
    const { items } = req.body;
    // items = [{ productId, qty }, ...]

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    let totalPrice = 0;
    const resolvedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      if (product.stock < item.qty) {
        return res.status(400).json({ message: `Insufficient stock for "${product.name}"` });
      }

      totalPrice += product.price * item.qty;

      resolvedItems.push({
        product:  product._id,
        name:     product.name,
        price:    product.price,
        qty:      item.qty,
        adminId:  product.createdBy,   // who owns this product
      });
    }

    // Decrement stock
    for (const item of resolvedItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.qty } });
    }

    const order = await Order.create({
      customer:   req.user._id,
      items:      resolvedItems,
      totalPrice,
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders/mine
// Customer sees their own orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate('items.product', 'name image price')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders/admin
// Admin sees orders that contain their products
export const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 'items.adminId': req.user._id })
      .populate('customer', 'name email')
      .populate('items.product', 'name image price')
      .sort({ createdAt: -1 });

    // Filter each order's items to only show THIS admin's items
    const filtered = orders.map((order) => ({
      _id:        order._id,
      status:     order.status,
      createdAt:  order.createdAt,
      customer:   order.customer,
      items:      order.items.filter((item) => item.adminId.toString() === req.user._id.toString()),
      totalPrice: order.items
        .filter((item) => item.adminId.toString() === req.user._id.toString())
        .reduce((sum, item) => sum + item.price * item.qty, 0),
    }));

    res.json({ success: true, orders: filtered });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/orders/:id/status
// Admin approves/rejects/updates order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['approved', 'rejected', 'shipped', 'delivered'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${validStatuses.join(', ')}` });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Make sure this admin owns at least one item in this order
    const ownsItem = order.items.some(
      (item) => item.adminId.toString() === req.user._id.toString()
    );

    if (!ownsItem) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    // Restore stock and delete order if rejected
    if (status === 'rejected' && order.status === 'pending') {
      for (const item of order.items) {
        if (item.adminId.toString() === req.user._id.toString()) {
          await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.qty } });
        }
      }

      await order.deleteOne();

      return res.json({ success: true, message: 'Order rejected and deleted' });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};