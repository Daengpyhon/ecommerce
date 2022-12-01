const express = require('express')
const router = express.Router();

//! import middleware
const {auth, adminCheck} = require('../middleware/auth')

// ! Controller
const {changeOrderStatus, getOrderAdmin, removeOrder} = require("../controllers/admin")

router.put('/admin/order-status', auth, changeOrderStatus)
router.get('/admin/orders', auth, getOrderAdmin)
router.delete('/admin/orders/:id', auth, removeOrder)

module.exports = router;