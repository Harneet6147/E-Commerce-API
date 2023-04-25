const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')

const { getAllProducts, getOneProduct, updateProduct, deleteProduct, totalProducts, createProduct } = require('../controllers/productController')

router.get(`/`, getAllProducts);

router.get(`/:id`, getOneProduct);

router.post(`/`, createProduct);

router.put(`/:id`, protect, updateProduct)

router.delete(`/:id`, protect, deleteProduct);

router.get(`/get/count`, totalProducts);

module.exports = router;


