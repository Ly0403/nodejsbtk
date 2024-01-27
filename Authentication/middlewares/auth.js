const isAuthenticated = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    req.session.redirectTo = req.originalUrl;
    return res.redirect("/auth/login");
  }
  next();
};

module.exports=isAuthenticated;
