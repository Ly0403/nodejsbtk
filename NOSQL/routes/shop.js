/* eslint-disable new-cap */
const express = require('express');
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndexPage);
router.get('/products', shopController.getProductsPage );
router.get('/products/:id', shopController.getProductsPageByID );
router.get('/category/:id', shopController.getProductsPageByCategoryID );
router.get('/orders', shopController.getOrdersPage );
router.get('/cart', shopController.getCartPage );
router.get('/addCart/:id', shopController.addCart );
router.get('/deleteCartItem', shopController.deleteCart );
router.get('/checkout', shopController.getCheckoutPage );

module.exports = router;
