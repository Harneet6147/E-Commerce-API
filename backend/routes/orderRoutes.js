const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { getOrders, getOrderDetails, createOrder, updateOrder, deleteOrder, getTotalOrders } = require("../controllers/orderController");


router.get(`/`, getOrders);

router.get(`/:id`, getOrderDetails);

router.post(`/`, createOrder);

router.put(`/:id`, updateOrder)

router.delete(`/:id`, protect, deleteOrder);

router.get(`/get/count`, getTotalOrders);

module.exports = router;