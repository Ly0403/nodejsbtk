/* eslint-disable new-cap */
const express = require("express");
const product = require('./product');
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", {
    title: "Homepage",
    products: product.products,
  });
});

router.use((req, res, next) => {
  res.render("404", {
    title: "404 Error",
  });
});

module.exports = router;
