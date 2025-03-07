import path from 'node:path'

import { Router } from 'express'
import multer from 'multer'

import { createCategory } from './app/useCases/categories/createCategory'
import { listCategories } from './app/useCases/categories/listCategories'
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory'
import { cancelOrder } from './app/useCases/orders/cancelOrder'
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus'
import { createOrder } from './app/useCases/orders/createOrder'
import { listOrders } from './app/useCases/orders/listOrders'
import { createProduct } from './app/useCases/products/createProduct'
import { listProducts } from './app/useCases/products/listProducts'

export const router = Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
    },
  }),
})

// List Categories
router.get('/categories', listCategories)

// Create Category
router.post('/categories', createCategory)

// List Products
router.get('/products', listProducts)

// Create Product
router.post('/products', upload.single('image'), createProduct)

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory)

// List Orders
router.get('/orders', listOrders)

// Create Order
router.post('/orders', createOrder)

// Change Order Status
router.patch('/orders/:orderId', changeOrderStatus)

// Delete/Cancel Order
router.delete('/orders/:orderId', cancelOrder)
