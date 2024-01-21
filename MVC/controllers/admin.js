const Category = require("../models/category");
const Product = require("../models/product");

const getProducts = (req, res, next) => {
  const products = Product.getAll();
  res.render("admin/products", {
    title: "Products",
    path: "/admin/products",
    products,
    action: req.query.action,
    name: req.query.name,
  });
};

const getAddProductPage = (req, res, next) => {
  res.render("admin/addProduct", {
    title: "Add Product",
    path: "/admin/addProduct",
  });
};

const addProduct = (req, res, next) => {
  const product = new Product(...Object.values(req.body));
  product.save();
  res.redirect("/admin/products");
};

const getEditProductPage = (req, res, next) => {
  const product = Product.getByID(req.params.id);
  res.render("admin/editProduct", {
    title: "Edit Product",
    path: "/admin/editProduct",
    product,
  });
};

const editProduct = (req, res, next) => {
  let product = Product.getByID(req.body.id);
  product = req.body;
  Product.update(product);
  res.redirect("/admin/products?action=edit&name=" + product.name);
};

const deleteProduct = (req, res, next) => {
  Product.delete(req.query.id);
  res.redirect("/admin/products?action=delete&name=" + req.query.id);
};

const addCategoryPage = (req, res, next) => {
  const categories = Category.getAll();
  res.render("admin/addCategory", {
    title: "Add Category",
    path: "/admin/addCategory",
    categories,
    result: req.query.result,
    name: req.query.name,
  });
};

const addCategory = (req, res, next) => {
  const category = new Category(...Object.values(req.body));
  category.save();
  res.redirect("/admin/addCategory?result=success");
};

const deleteCategory = (req, res, next) => {
  Category.delete(req.query.id);
  res.redirect(
      "/admin/addCategory?action=delete&result=successDelete&&name=" +
      req.query.id);
};

module.exports = {
  addCategoryPage,
  addCategory,
  getAddProductPage,
  addProduct,
  getEditProductPage,
  editProduct,
  getProducts,
  deleteProduct,
  deleteCategory,
};
