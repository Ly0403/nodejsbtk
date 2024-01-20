const express = require('express');

const app = express();

app.listen(3000, ()=>{
  console.log('Server Started');
});

app.get('/', (req, res) => {
  res.send('First Express App');
});

app.get('/products', (req, res) => {
  res.send('Product List');
});
