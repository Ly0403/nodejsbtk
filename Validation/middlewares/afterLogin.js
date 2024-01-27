const isLoggedIn = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return res.redirect("/");
  }
  next();
};

module.exports=isLoggedIn;
