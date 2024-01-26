const express = require('express');
const errorRoutes = require('./routes/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./models/user');

const app = express();

// static files
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(bodyParser.urlencoded({extended: false}));

// setting default view engine and path
app.set('view engine', 'pug'); // default value is undefined
app.set('views', path.join(__dirname, 'views')); // default value is /views

// middlewares
app.use(async (req, res, next)=> {
  const user = await User.findByName('yucel');
  if (!user) {
    const newUser = new User('yucel', 'aa@aaa', {} );
    const userCreated= await newUser.save();
    req.user = userCreated;
  } else {
    req.user = new User(user.name, user.email
        , user.cart, user.orders, user._id);
  }
  next();
});

// routes
app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

app.use(errorRoutes);

app.listen(5002);
