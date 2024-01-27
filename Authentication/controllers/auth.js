const User = require("../models/user");
const bcrypt = require("bcrypt");
const sendMail = require("../config/sendmail");

const getLogin = async (req, res, next) => {
  res.render("auth/login", {
    title: "Login",
    path: "/auth/login",
    result: req.query.result,
  });
};

const postLogin = async (req, res, next) => {
  const user = await User.findOne({email: req.body.email});
  if (!user|| ! await bcrypt.compare(req.body.password, user.password) ) {
    return res.redirect("/auth/login?result=noUser");
  }
  req.session.user = user;
  req.session.isAuthenticated = true;
  const url = req.session.redirectTo ?? "/";
  delete req.session.redirectTo;
  res.redirect(url);
};

const getRegister = async (req, res, next) => {
  res.render("auth/register", {
    title: "Register",
    path: "/auth/register",
  });
};

const postRegister = async (req, res, next) => {
  const user = await User.findOne({email: req.body.email});
  if (user) {
    return res.redirect("/auth/login?result=existedUser");
  }
  req.body.cart={
    items: [],
  };
  req.body.password = await bcrypt.hash(req.body.password, 12);
  await User.create(req.body);
  res.redirect("/auth/login");
  sendMail(req.body.email, "lyofficialtr@gmail.com", "user registration"
      , "<h1>Account was registered!!!</h1>");
};

const getReset = async (req, res, next) => {
  res.render("auth/reset", {
    title: "Reset",
    path: "/auth/reset",
    result: req.query.result,
  });
};

const postReset = async (req, res, next) => {
  const user = await User.findOne({email: req.body.email});
  if (!user) {
    return res.redirect("/auth/reset?result=noEmail");
  }
  const token = crypto.randomUUID();
  const tokenExpire = Date.now() + 36000000;
  await User.updateOne({_id: user._id}, {$set: {token, tokenExpire}} );
  res.redirect("/auth/login");
  sendMail(req.body.email, "lyofficialtr@gmail.com", "user password reset"
      , `<h1>Click on the link <a href="http://10.100.100.100:5002/auth/passwordReset/${token}">Reset Password</a> to reset password!!!</h1>`);
};

const getPasswordReset = async (req, res, next) => {
  const user = await User.findOne({token: req.params.token,
    tokenExpire: {$gt: Date.now()}});
  if (!user) {
    return res.redirect("/auth/reset?result=invalidToken");
  }
  res.render("auth/passwordReset", {
    title: "Password Reset",
    path: "/auth/passwordReset",
    token: req.params.token,
    tokenExpire: user.tokenExpire,
  });
};

const postPasswordReset = async (req, res, next) => {
  const user = await User.findOne({token: req.params.token,
    tokenExpire: {$gt: Date.now()}});
  if (!user) {
    return res.redirect("/auth/reset?result=invalidToken");
  }
  const newPassword = await bcrypt.hash(req.body.password, 12);
  await User.updateOne({_id: user._id}, {$set: {password: newPassword},
    $unset: {token: req.params.token}} );
  res.redirect("/auth/login");
};

const getLogout = async (req, res, next) => {
  // res.cookie("isAuthenticated", false);
  req.session.destroy();
  res.redirect("/");
};

module.exports = {
  getLogout,
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getReset,
  getPasswordReset,
  postPasswordReset,
  postReset,
};
