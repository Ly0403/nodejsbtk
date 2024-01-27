/* eslint-disable new-cap */
const express = require('express');
const authController = require('../controllers/auth');
const isLoggedIn = require("../middlewares/afterLogin");
const locals = require("../middlewares/locals");

const router = express.Router();

router.get('/login', isLoggedIn, locals, authController.getLogin);
router.post('/login', isLoggedIn, locals, authController.postLogin);

router.get('/register', isLoggedIn, locals, authController.getRegister);
router.post('/register', isLoggedIn, locals, authController.postRegister);

router.get('/reset', isLoggedIn, locals, authController.getReset);
router.post('/reset', isLoggedIn, locals, authController.postReset);

router.get('/passwordReset/:token', isLoggedIn, locals,
    authController.getPasswordReset);
router.post('/passwordReset/:token', isLoggedIn, locals,
    authController.postPasswordReset);

router.get('/logout', locals, authController.getLogout);

module.exports = router;
