const Product = require("../models/product");
const Category = require("../models/category");

const getIndexPage = async (req, res, next) => {
  const categories = await Category.findAll({attributes: ['id', 'name']});
  const products = await Product
      .findAll({
        attributes: ['id', 'name', 'image', 'description', 'categoryId']} );
  res.render("shop/index", {
    title: "Shopping",
    path: "/",
    products,
    categories,
  });
};

const getProductsPage = async (req, res, next) => {
  const products = await Product
      .findAll({
        attributes: ['id', 'name', 'image', 'description', 'categoryId']} );
  const categories = await Category.findAll({attributes: ['id', 'name']});
  res.render("shop/products", {
    title: "Products",
    path: "/products",
    products,
    categories,
  });
};

const getProductsPageByID = async (req, res, next) => {
  const product = await Product.findOne({where: {id: req.params.id}} );
  res.render("shop/productDetails", {
    title: product.name,
    path: "/products",
    product,
  });
};

const getProductsPageByCategoryID = async (req, res, next) => {
  const categories = await Category.findAll();
  let products = (categories.find((v)=>v.id==req.params.id));
  products = await products.getProducts();
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
  console.log(orders[0]?.products);
  res.render("shop/orders", {
    title: "Orders",
    path: "/orders",
    orders,
  });
};

const getCartPage = async (req, res, next) => {
  const cart = await req.user.getCart();
  const products= await cart.getProducts();
  const total =
    products.reduce((sum, current) =>
      ( sum + (current.cartitems.quantity * 8) ), 0);
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
  const cart = await req.user.getCart();
  const product = await Product.findByPk(Number(req.params.id));
  let quantity = 1;
  const productsInCart = await cart.getProducts();
  productsInCart.forEach((v)=>v.id === product.id ?
    quantity += v.cartitems.quantity:null );
  await cart.addProduct(product, {
    through: {
      quantity: quantity,
    },
  });
  res.redirect("/cart?result=success");
};


const deleteCart = async (req, res, next) => {
  const cart = await req.user.getCart();
  const product = await cart.getProducts( {where: {id: req.query.id}});
  await product[0].cartitems.destroy();
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
