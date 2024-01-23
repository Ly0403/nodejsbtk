get404ErrorPage = (req, res, next)=>{
  res.render('errors/404', {
    title: 'Error Page',
  });
};

module.exports = {
  get404ErrorPage,
};
