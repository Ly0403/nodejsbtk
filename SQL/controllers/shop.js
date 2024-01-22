const Product = require('../models/product');
const Category = require('../models/category');

const getIndexPage = async (req, res, next) =>{
  const categories = await Category.getAll();
  const products = await Product.getAll();
  res.render('shop/index', {
    title: 'Shopping',
    path: '/',
    products: products[0],
    categories: categories[0] ,
  });
};

const getProductsPage = async (req, res, next) =>{
  const products = await Product.getAll() ;
  const categories = await Category.getAll();
  res.render('shop/products', {
    title: 'Products',
    path: '/products',
    products: products[0],
    categories: categories[0],
  });
};

const getProductsPageByID = async (req, res, next) =>{
  const product = await Product.getByID(req.params.id);
  res.render('shop/productDetails', {
    title: product.name,
    path: '/products',
    product: product[0][0]  ,
  });
};

const getProductsPageByCategoryID = async (req, res, next) =>{
  const products = await Product.getByCategoryID(req.params.id);
  const categories = await Category.getAll();
  res.render('shop/products', {
    title: 'Products',
    path: '/products',
    products: products[0],
    categories: categories[0],
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
