/* eslint-disable new-cap */
const express = require('express');

const router = express.Router();

const products = [
  {
    name: "Samsung A",
    image: "2.jpeg",
    description: "First product in the list",
  }, {
    name: "Samsung B",
    image: "2.jpeg",
    description: "Second product in the list",
  }, {
    name: "Samsung B",
    image: "2.jpeg",
    description: "Second product in the list",
  }, {
    name: "Samsung B",
    image: "2.jpeg",
    description: "Second product in the list",
  }, {
    name: "Samsung B",
    image: "2.jpeg",
    description: "Second product in the list",
  }, {
    name: "Samsung B",
    image: "2.jpeg",
    description: "Second product in the list",
  },
];

router.get('/', (req, res, next)=>{
  res.render('product', {
    title: 'Products',
    path: 'product',
  });
});

router.post('/add', (req, res, next)=>{
  products.push(req.body);
  res.redirect('/');
});

exports.router = router;
exports.products = products;
