const express = require('express');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

const app = express();

app.listen(3000);

app.use('/product', productRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res, next)=>{
  res.send('Default Page');
});
