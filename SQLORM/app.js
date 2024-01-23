const express = require('express');
const errorRoutes = require('./routes/error');
const path = require('path');
const bodyParser = require('body-parser');
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
const sequelize = require('./config/db');
const Product = require('./models/product');
const Category = require('./models/category');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartitem');
const Order = require('./models/order');
const OrderItem = require('./models/orderitem');

const app = express();

app.listen(5002);
// static files
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(bodyParser.urlencoded({extended: false}));

// setting default view engine and path
app.set('view engine', 'pug'); // default value is undefined
app.set('views', path.join(__dirname, 'views')); // default value is /views

// middlewares
app.use(async (req, res, next) => {
  const user = await User.findByPk(1);
  req.user = user;
  const cart = await user.getCart();
  cart ? null : await req.user.createCart();
  next();
} );

// routes
app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

app.use(errorRoutes);


// DB OPS
Product.belongsTo(Category, {
  foreignKey: {
    allowNull: false,
  },
} );
Category.hasMany(Product);

Product.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
} );
User.hasMany(Product);

Cart.belongsTo(User);
User.hasOne(Cart);

Cart.belongsToMany(Product, {
  through: CartItem,
});

Product.belongsToMany(Cart, {
  through: CartItem,
});

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, {
  through: OrderItem,
});

Product.belongsTo(Order, {
  through: OrderItem,
});

sequelize
    .sync( )
    // .sync({force: true} )
    .then((res)=>
      console.log(`The database and tables are ready!
The server is listening on port 5002!!!`))
    .catch((err)=>console.log(err));
