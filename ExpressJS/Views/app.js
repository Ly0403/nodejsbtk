const express = require('express');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const indexRoute = require('./routes/index');
const path = require('path');

const app = express();

app.listen(3000);
// static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRoute);
app.use('/product', productRoute);
app.use(indexRoute);

