const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.put('/:id/status', orderController.updateOrderStatus);
router.get('/:id', orderController.getOrderById);
router.put('/:id/payment', orderController.updatePaymentStatus);


module.exports = router;
