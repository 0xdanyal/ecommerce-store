import express from 'express';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import {
	createProduct,
	updateProduct,
	deleteProduct,
	getProducts,
	getProductById
} from '../controllers/productController.js';

const router = express.Router();

// admin will create a product
router.post('/create', protect, authorize('admin'), createProduct);

// admin will update a product
router.put('/edit/:id', protect, authorize('admin'), updateProduct);

// admin will delete a product
router.delete('/delete/:id', protect, authorize('admin'), deleteProduct);

router.get('/', getProducts); // public - list products with pagination
router.get('/:id', getProductById); // public - get single product

export default router;

