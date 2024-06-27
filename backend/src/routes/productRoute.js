import express from 'express';

import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productControllers';

const router = express.Router();

router.get('/', getProducts)
router.post('/create', createProduct);
router.get('/:id', getProductById);
router.put('/update/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;