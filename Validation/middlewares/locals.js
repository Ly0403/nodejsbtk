const locals = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.isAdmin = req.user?.isAdmin ?? false;
  next();
};

module.exports = locals;
