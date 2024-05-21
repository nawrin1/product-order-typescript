import express from 'express';
import { productController } from './product.controller';

const router=express.Router()
// router.get('/',productController.getAllProducts)
// router.get('/:productId',productController.getSingleProduct)

router.post('/',productController.postProduct)
// router.put('/:productId',productController.updateProduct)
// router.delete('/:productId',productController.deleteProduct)

export const  ProductRoutes=router;
