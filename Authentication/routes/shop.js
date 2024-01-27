/* eslint-disable new-cap */
const express = require('express');
const shopController = require('../controllers/shop');
const isAuthenticated = require("../middlewares/auth");
const locals = require("../middlewares/locals");

const router = express.Router();

router.get('/', locals, shopController.getIndexPage);
router.get('/products', locals, shopController.getProductsPage );
router.get('/products/:id', locals, shopController.getProductsPageByID );
router.get('/category/:id', locals,
    shopController.getProductsPageByCategoryID );
router.get('/orders', isAuthenticated, locals, shopController.getOrdersPage );
router.get('/createOrder', isAuthenticated,
    locals, shopController.createOrder );
router.get('/cart', isAuthenticated, locals, shopController.getCartPage );
router.get('/addCart/:id', isAuthenticated, locals, shopController.addCart );
router.get('/deleteCartItem', isAuthenticated, locals,
    shopController.deleteCart );

module.exports = router;
