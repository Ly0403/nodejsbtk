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

const getOrdersPage = async (req, res, next) => {
  const user = req.user;
  const cart = await user.getCart();
  let currentProducts = await cart.getProducts();
  if (currentProducts.length>0) {
    currentProducts = currentProducts.map((v)=> {
      v.orderitems = {
        quantity: v.cartitems.quantity,
        price: 222,
      };
      return v;
    });
    const order = await user.createOrder();
    await order.addProducts(currentProducts);
  }
  cart.setProducts(null);
  const orders = await user.getOrders({include: 'products'});
  res.render("shop/orders", {
    title: "Orders",
    path: "/orders",
    orders,
  });
};

const getCartPage = async (req, res, next) => {
  const products = await req.user.getCart();
  console.log(products);
  let total = 0;
  products.forEach((v)=> total += Number(v.quantity));
  const result = req.query.result;
  res.render("shop/cart", {
    title: "Carts",
    path: "/cart",
    products,
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


const getCheckoutPage = async (req, res, next) => {
  res.render("shop/checkout", {
    title: "Checkout",
    path: "/checkout",
  });
};

module.exports = {
  getIndexPage,
  getCartPage,
  addCart,
  deleteCart,
  getOrdersPage,
  getCheckoutPage,
  getProductsPage,
  getProductsPageByID,
  getProductsPageByCategoryID,
};
