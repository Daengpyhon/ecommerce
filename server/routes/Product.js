const express = require('express');
const router = express.Router();

// Controllers
const {create, lists, remove, read, update, listBy, searchFilters} = require('../controllers/Product')
// Midleware
const {auth, adminCheck} = require('../middleware/auth')

//Enpoint : http://localhost:9000/api/product
router.post('/product', auth, adminCheck,create)
router.get('/product/:count', lists)
router.delete('/product/:id', auth, adminCheck, remove)
 
// Update
router.get('/products/:id', read)
router.put('/product/:id', auth, adminCheck, update)


router.post('/productby', listBy)

// Search
router.post('/search/filters',  searchFilters)

module.exports = router