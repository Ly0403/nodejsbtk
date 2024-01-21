const Product = require('../models/product');
const Category = require('../models/category');

const getIndexPage = (req, res, next) =>{
  const products = Product.getAll();
  const categories = Category.getAll();
  res.render('shop/index', {
    title: 'Shopping',
    path: '/',
    products,
    categories,
  });
};

const getProductsPage = (req, res, next) =>{
  const products = Product.getAll();
  const categories = Category.getAll();
  res.render('shop/products', {
    title: 'Products',
    path: '/products',
    products,
    categories,
  });
};

const getProductsPageByID = (req, res, next) =>{
  const product = Product.getByID(req.params.id);
  res.render('shop/productDetails', {
    title: product.name,
    path: '/products',
    product,
  });
};

const getProductsPageByCategoryID = (req, res, next) =>{
  const products = Product.getByCategoryID(req.params.id);
  const categories = Category.getAll();
  res.render('shop/products', {
    title: 'Products',
    path: '/products',
    products,
    categories,
    selectedCategoryId: req.params.id,
  });
};

const getOrdersPage = (req, res, next) =>{
  res.render('shop/orders', {
    title: 'Orders',
    path: '/orders',
  });
};

const getCartPage = (req, res, next) =>{
  res.render('shop/cart', {
    title: 'Carts',
    path: '/cart',
  });
};

const getCheckoutPage = (req, res, next) =>{
  res.render('shop/checkout', {
    title: 'Checkout',
    path: '/checkout',
  });
};

module.exports = {
  getIndexPage,
  getCartPage,
  getOrdersPage,
  getCheckoutPage,
  getProductsPage,
  getProductsPageByID,
  getProductsPageByCategoryID,
};
