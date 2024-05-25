import express from 'express';

import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productControllers';

const router = express.Router();

router.get('/', getProducts)
router.post('/new', createProduct);
router.get('/:id', getProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router;