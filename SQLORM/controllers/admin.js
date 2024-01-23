const Category = require("../models/category");
const Product = require("../models/product");

const getProducts = async (req, res, next) => {
  const products = await Product.findAll({
    attributes: ['id', 'name', 'image', 'description', 'categoryId'],
  } );
  res.render("admin/products", {
    title: "Products",
    path: "/admin/products",
    products,
    action: req.query.action,
    name: req.query.name,
  });
};

const getAddProductPage = async (req, res, next) => {
  const categories = await Category.findAll({
    attributes: ['id', 'name'],
  } );
  res.render("admin/addProduct", {
    title: "Add Product",
    path: "/admin/addProduct",
    categories,
  });
};

const addProduct = async (req, res, next) => {
  const user = req.user;
  await user.createProduct(req.body);
  res.redirect("/admin/products");
};

const getEditProductPage = async (req, res, next) => {
  const product = await Product.findOne(req.params);
  const categories = await Category.findAll({
    attributes: ['id', 'name'],
  });
  res.render("admin/editProduct", {
    title: "Edit Product",
    path: "/admin/editProduct",
    product,
    categories,
  });
};

const editProduct = async (req, res, next) => {
  const product = await Product.findByPk(req.body.id);
  [product.id, product.name, product.image, product.categoryId
    , product.description] = Object.values(req.body);
  product.categoryId = Number(product.categoryId);
  await product.save();
  res.redirect("/admin/products?action=edit&name=" + product.name);
};

const deleteProduct = async (req, res, next) => {
  await Product.destroy({where: req.query.id});
  res.redirect("/admin/products?action=delete&name=" + req.query.id);
};

const addCategoryPage = async (req, res, next) => {
  const categories = await Category.findAll({
    attributes: ['id', 'name'],
  } );
  res.render("admin/addCategory", {
    title: "Add Category",
    path: "/admin/addCategory",
    categories,
    result: req.query.result,
    name: req.query.name,
  });
};

const addCategory = async (req, res, next) => {
  await Category.create(req.body);
  res.redirect("/admin/addCategory?result=success");
};

const deleteCategory = async (req, res, next) => {
  await Category.destroy({where: {id: req.query.id}} );
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
