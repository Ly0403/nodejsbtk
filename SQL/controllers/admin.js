const Category = require("../models/category");
const Product = require("../models/product");

const getProducts = async (req, res, next) => {
  const products = await Product.getAll();
  res.render("admin/products", {
    title: "Products",
    path: "/admin/products",
    products: products[0],
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

const getEditProductPage = async (req, res, next) => {
  const product = await Product.getByID(req.params.id);
  res.render("admin/editProduct", {
    title: "Edit Product",
    path: "/admin/editProduct",
    product: product[0][0]  ,
  });
};

const editProduct = async (req, res, next) => {
  await Product.update(req.body);
  let product = await Product.getByID(req.body.id);
  res.redirect("/admin/products?action=edit&name=" + product[0][0].name);
};

const deleteProduct = (req, res, next) => {
  Product.delete(req.query.id);
  res.redirect("/admin/products?action=delete&name=" + req.query.id);
};

const addCategoryPage = async (req, res, next) => {
  const categories = await Category.getAll();
  res.render("admin/addCategory", {
    title: "Add Category",
    path: "/admin/addCategory",
    categories:categories[0],
    result: req.query.result,
    name: req.query.name,
  });
};

const addCategory = (req, res, next) => {
  const category = new Category(req.body.name);
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
