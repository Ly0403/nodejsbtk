const express = require('express');
const app = express();

app.listen(3000);

// logging middleware
app.use('/', (req, res, next)=>{
  console.log('request was logged');
  next();
});

app.use('/product', (req, res, next)=>{
  res.send('Product Page');
});

app.use('/user', (req, res, next)=>{
  res.send('User Page');
});

app.use('/', (req, res, next)=>{
  res.send('Home Page');
});

