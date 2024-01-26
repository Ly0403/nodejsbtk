const Product = require("../models/product");
const Category = require("../models/category");
const User = require("../models/user");
const Order = require("../models/order");

const getIndexPage = async (req, res, next) => {
  const categories = await Category.find({});
  const products = await Product
      .find({});
  res.render("shop/index", {
    title: "Shopping",
    path: "/",
    products,
    categories,
  });
};

const getProductsPage = async (req, res, next) => {
  const products = await Product
      .find({});
  const categories = await Category.find({});
  res.render("shop/products", {
    title: "Products",
    path: "/products",
    products,
    categories,
  });
};

const getProductsPageByID = async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('categoryIds');
  res.render("shop/productDetails", {
    title: product.name,
    path: "/products",
    product,
  });
};

const getProductsPageByCategoryID = async (req, res, next) => {
  const categories = await Category.find({});
  const products = await Product.find({categoryIds: req.params.id});
  res.render("shop/products", {
    title: "Products",
    path: "/products",
    products,
    categories,
    selectedCategoryId: req.params.id,
  });
};


const getCartPage = async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("cart.items.product");
  let total = 0;
  user.cart.items.forEach((v)=> total += Number(v.quantity*10));
  const result = req.query.result;
  const products = [];
  for (const v of user.cart.items) {
    v.product.quantity = v.quantity;
    products.push(v.product);
  }
  res.render("shop/cart", {
    title: "Carts",
    path: "/cart",
    products,
    result,
    total,
  });
};

const addCart = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  req.user.addToCart(product);
  res.redirect("/cart?result=success");
};


const deleteCart = async (req, res, next) => {
  await req.user.deleteCart(req.query.id);
  res.redirect("/cart?result=delete");
};


const getOrdersPage = async (req, res, next) => {
  const orders = await Order.find({userId: req.user._id});
  res.render("shop/orders", {
    title: "Orders",
    path: "/orders",
    orders,
  });
};

const createOrder = async (req, res, next) => {
  const user = await User.findById({_id: req.user._id})
      .populate("cart.items.product");
  const itemsInCart = [];
  user.cart.items.forEach((v) =>{
    itemsInCart.push({
      name: v.product.name,
      image: v.product.image,
      quantity: v.quantity,
    });
  });
  await Order.create({
    userId: req.user._id,
    items: itemsInCart,
  });

  await User.updateOne({_id: req.user._id}, {$set: {
    cart: {items: []},
  }});
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
