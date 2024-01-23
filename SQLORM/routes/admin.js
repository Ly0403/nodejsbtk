/* eslint-disable new-cap */
const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/products', adminController.getProducts);
router.get('/addProduct', adminController.getAddProductPage);
router.post('/addProduct', adminController.addProduct);
router.get('/editProduct/:id', adminController.getEditProductPage);
router.post('/editProduct', adminController.editProduct);
router.get('/deleteProduct', adminController.deleteProduct);
router.get('/addCategory', adminController.addCategoryPage);
router.post('/addCategory', adminController.addCategory);
router.get('/deleteCategory', adminController.deleteCategory);

module.exports = router;
