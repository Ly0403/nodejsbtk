const express = require('express');
const errorRoutes = require('./routes/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./models/user');
const connectDB = require('./config/db');

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
  const user = await User.findOne({name: 'yucel'});
  if (!user) {
    const userCreated= await User.create({
      name: 'yucel',
      email: 'aa@aa.com',
      cart: {
        items: [],
      },
    });
    req.user = userCreated;
  } else {
    req.user = user;
  }
  next();
});

// routes
app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

app.use(errorRoutes);

connectDB().then(()=>{
  app.listen(process.env.PORT);
  console.log("mongodb was connected and the server is listening on port " +
    process.env.PORT);
});
