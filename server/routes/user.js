const express = require('express');
const router = express.Router();
// ! import user controller
const {listUsers, readUsers, updateUsers, removeUsers, changeStatus, changeRole, userCart, getUserCart, saveAddress, saveOrder, emptyCart, addToWishList, getWishList, removeWishList, getOrder} = require('../controllers/user')

//! import middleware
const {auth, adminCheck} = require('../middleware/auth')

router.get('/users',auth, adminCheck,listUsers) //1

router.get('/users/:id', readUsers) //2

router.put('/users/:id', updateUsers) //3

router.delete('/users/:id', removeUsers) //4

router.post('/change-status',auth, adminCheck, changeStatus) //5

router.post('/change-role',auth, adminCheck, changeRole) //6

router.post('/user/cart',auth, userCart) // 7

router.get('/user/cart',auth, getUserCart) // 8
router.delete('/user/cart',auth, emptyCart) // 11

router.post('/user/address',auth, saveAddress) // 9
// order
router.post('/user/order',auth, saveOrder) // 10
// History
router.get('/user/orders',auth, getOrder) // 10

// Wishlist
router.post('/user/wishlist',auth, addToWishList) // 11
router.get('/user/wishlist',auth, getWishList) // 12
router.put('/user/wishlist/:productId',auth, removeWishList) // 13



module.exports = router