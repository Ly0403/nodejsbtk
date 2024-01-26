const Product = require("../models/product");
const Category = require("../models/category");

const getIndexPage = async (req, res, next) => {
  const categories = await Category.findAll();
  const products = await Product
      .findAll({});
  res.render("shop/index", {
    title: "Shopping",
    path: "/",
    products,
    categories,
  });
};

const getProductsPage = async (req, res, next) => {
  const products = await Product
      .findAll({});
  const categories = await Category.findAll();
  res.render("shop/products", {
    title: "Products",
    path: "/products",
    products,
    categories,
  });
};

const getProductsPageByID = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.render("shop/productDetails", {
    title: product.name,
    path: "/products",
    product,
  });
};

const getProductsPageByCategoryID = async (req, res, next) => {
  const categories = await Category.findAll();
  const products = await Product.findByCategoryId(req.params.id);
  res.render("shop/products", {
    title: "Products",
    path: "/products",
    products,
    categories,
    selectedCategoryId: req.params.id,
  });
};


const getCartPage = async (req, res, next) => {
  const cart = await req.user.getCart();
  let total = 0;
  cart.items.forEach((v)=> total += Number(v.quantity*10));
  const result = req.query.result;
  res.render("shop/cart", {
    title: "Carts",
    path: "/cart",
    products: cart.items,
    result,
    total,
  });
};

const addCart = async (req, res, next) => {
  await req.user.addCart(req.params.id);
  res.redirect("/cart?result=success");
};


const deleteCart = async (req, res, next) => {
  await req.user.deleteCart(req.query.id);
  res.redirect("/cart?result=delete");
};


const getOrdersPage = async (req, res, next) => {
  const user = req.user;
  const orders = await user.getOrders();
  res.render("shop/orders", {
    title: "Orders",
    path: "/orders",
    orders,
  });
};

const createOrder = async (req, res, next) => {
  await req.user.createOrder();
  res.redirect("/orders");
};


module.exports = {
  getIndexPage,
  getCartPage,
  addCart,
  deleteCart,
  getOrdersPage,
  createOrder,
  getProductsPage,
  getProductsPageByID,
  getProductsPageByCategoryID,
};
