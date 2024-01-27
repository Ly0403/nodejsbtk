const express = require('express');
const errorRoutes = require('./routes/error');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');
const User = require("./models/user");
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const csurf = require("csurf");

const app = express();
const sessionStore = new MongoDbStore({
  uri: process.env.MONGOURLSESSION,
  collection: "sessions",
});
// static files
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(bodyParser.urlencoded({extended: false}));

// cookie parser
app.use(cookieParser());

// session
app.use(session({
  secret: 'no secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 360000,
  },
  store: sessionStore,
}));

// setting default view engine and path
app.set('view engine', 'pug'); // default value is undefined
app.set('views', path.join(__dirname, 'views')); // default value is /views

// middlewares
app.use(async (req, res, next)=> {
  if (!req.session.user) {
    return next();
  }
  const user = await User.findById(req.session.user._id);
  req.user = user;
  next();
});

// csrf tokens
app.use(csurf({cookie: true}));

// routes
app.use('/admin', adminRoutes);
app.use('/', shopRoutes);
app.use('/auth', authRoutes);
app.use(errorRoutes);

connectDB().then(()=>{
  app.listen(process.env.PORT);
  console.log("mongodb was connected and the server is listening on port " +
    process.env.PORT);
});
