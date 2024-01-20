const express = require('express');

const app = express();

app.listen(3000);

app.use((req, res, next)=>{
  console.log('first middleware');
  next();
});

app.use((req, res, next)=>{
  console.log('Second middleware');
  res.send('<h1>MIDDLEWARE</h1>');
});

