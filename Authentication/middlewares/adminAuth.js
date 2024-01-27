const isAdmin = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    req.session.redirectTo = req.originalUrl;
    return res.redirect("/auth/login");
  }
  if (!req.user.isAdmin) {
    return res.redirect("/");
  }

  next();
};

module.exports=isAdmin;
