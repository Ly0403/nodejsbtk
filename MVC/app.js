const express = require('express');
const errorRoutes = require('./routes/error');
const path = require('path');
const bodyParser = require('body-parser');
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

const app = express();

app.listen(3000);
// static files
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(bodyParser.urlencoded({extended: false}));

// setting default view engine and path
app.set('view engine', 'pug'); // default value is undefined
app.set('views', path.join(__dirname, 'views')); // default value is /views

app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

app.use(errorRoutes);

