const Category = require("../models/category");
const Product = require("../models/product");

const getProducts = async (req, res, next) => {
  const products = await Product.findAll({});
  res.render("admin/products", {
    title: "Products",
    path: "/admin/products",
    products,
    action: req.query.action,
    name: req.query.name,
  });
};

const getAddProductPage = async (req, res, next) => {
  const categories = await Category.findAll({} );
  res.render("admin/addProduct", {
    title: "Add Product",
    path: "/admin/addProduct",
    categories,
  });
};

const addProduct = async (req, res, next) => {
  req.body.categoryIds && !Array.isArray(req.body.categoryIds) ?
  req.body.categoryIds = [req.body.categoryIds]:null;
  const product = new Product(...Object.values(req.body), req.user.id);
  await product.save();
  res.redirect("/admin/products");
};

const getEditProductPage = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  const categories = await Category.findAll();
  res.render("admin/editProduct", {
    title: "Edit Product",
    path: "/admin/editProduct",
    product,
    categories,
  });
};

const editProduct = async (req, res, next) => {
  await Product.update(req.body);
  res.redirect("/admin/products?action=edit&name=" + req.body.name);
};

const deleteProduct = async (req, res, next) => {
  await Product.delete(req.query.id);
  res.redirect("/admin/products?action=delete&name=" + req.query.name);
};

const addCategoryPage = async (req, res, next) => {
  const categories = await Category.findAll();
  res.render("admin/addCategory", {
    title: "Add Category",
    path: "/admin/addCategory",
    categories,
    result: req.query.result,
    name: req.query.name,
  });
};

const addCategory = async (req, res, next) => {
  const category = new Category(...Object.values(req.body));
  await category.save();
  res.redirect("/admin/addCategory?result=success");
};

const deleteCategory = async (req, res, next) => {
  await Category.delete(req.query.id);
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
