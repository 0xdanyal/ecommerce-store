import express from 'express';
import {
  getProducts, getProductById, createProduct,
  updateProduct, deleteProduct,
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, isAdmin, upload.array('images', 5), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, isAdmin, upload.array('images', 5), updateProduct)
  .delete(protect, isAdmin, deleteProduct);

export default router;