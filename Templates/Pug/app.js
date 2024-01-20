const express = require('express');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const indexRoute = require('./routes/index');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.listen(3000);
// static files
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(bodyParser.urlencoded({extended: false}));

// setting default view engine and path
app.set('view engine', 'pug'); // default value is undefined
app.set('views', path.join(__dirname, 'views')); // default value is /views

app.use('/user', userRoute);
app.use('/product', productRoute.router);
app.use(indexRoute);

