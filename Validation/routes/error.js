/* eslint-disable new-cap */
const express = require("express");
const errorController = require("../controllers/errors");

const router = express.Router();

router.use(errorController.get404ErrorPage);

module.exports = router;
