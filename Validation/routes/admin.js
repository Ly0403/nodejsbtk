/* eslint-disable new-cap */
const express = require('express');
const adminController = require('../controllers/admin');
const isAdmin = require("../middlewares/adminAuth");
const locals = require("../middlewares/locals");

const router = express.Router();

router.get('/products', isAdmin, locals, adminController.getProducts);
router.get('/addProduct', isAdmin, locals,
    adminController.getAddProductPage);
router.post('/addProduct', isAdmin, locals, adminController.addProduct);
router.get('/editProduct/:id', isAdmin
    , locals, adminController.getEditProductPage);
router.post('/editProduct', isAdmin, locals,
    adminController.editProduct);
router.get('/deleteProduct', isAdmin, locals,
    adminController.deleteProduct);
router.get('/addCategory', isAdmin, locals,
    adminController.addCategoryPage);
router.post('/addCategory', isAdmin, locals,
    adminController.addCategory);
router.get('/deleteCategory', isAdmin, locals,
    adminController.deleteCategory);

module.exports = router;
