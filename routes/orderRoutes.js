import express from 'express';
import {
  placeOrder, getMyOrders, getAdminOrders, updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/place-order', protect, authorize('customer'), placeOrder);
router.get('/mine', protect, authorize('customer'), getMyOrders);
router.get('/admin-orders', protect, authorize('admin'), getAdminOrders);
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);

export default router;