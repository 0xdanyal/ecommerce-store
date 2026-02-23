import express from 'express';
import {
  placeOrder, getMyOrders, getAllOrders, updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, placeOrder).get(protect, isAdmin, getAllOrders);
router.get('/myorders', protect, getMyOrders);
router.put('/:id/status', protect, isAdmin, updateOrderStatus);

export default router;