const Category = require("../models/category");
const Product = require("../models/product");

const getProducts = async (req, res, next) => {
  const products = await Product.find({ userId: req.user._id });
  res.render("admin/products", {
    title: "Products",
    path: "/admin/products",
    products,
    action: req.query.action,
    name: req.query.name,
  });
};

const getAddProductPage = async (req, res, next) => {
  const categories = await Category.find({});
  res.render("admin/addProduct", {
    title: "Add Product",
    path: "/admin/addProduct",
    categories,
  });
};

const addProduct = async (req, res, next) => {
  try {
    req.body.categoryIds && !Array.isArray(req.body.categoryIds)?
    (req.body.categoryIds = [req.body.categoryIds]):
    null;
    req.body.userId = req.user._id;
    await Product.create(req.body);
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getEditProductPage = async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });
  const categories = await Category.find({});
  res.render("admin/editProduct", {
    title: "Edit Product",
    path: "/admin/editProduct",
    product,
    categories,
  });
};

const editProduct = async (req, res, next) => {
  try {
    await Product.updateOne(
        { _id: req.body.id, userId: req.user._id },
        { $set: req.body },
    );
    res.redirect("/admin/products?action=edit&name=" + req.body.name);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  await Product.findByIdAndDelete({ _id: req.query.id, userId: req.user._id });
  res.redirect("/admin/products?action=delete&name=" + req.query.name);
};

const addCategoryPage = async (req, res, next) => {
  const categories = await Category.find({});
  res.render("admin/addCategory", {
    title: "Add Category",
    path: "/admin/addCategory",
    categories,
    result: req.query.result,
    name: req.query.name,
  });
};

const addCategory = async (req, res, next) => {
  try {
    await Category.create(req.body);
    res.redirect("/admin/addCategory?result=success");
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.query.id);
    res.redirect(
        "/admin/addCategory?action=delete&result=successDelete&&name=" +
        req.query.name,
    );
  } catch (error) {
    console.log(error.message);
    next(error);
  }
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
