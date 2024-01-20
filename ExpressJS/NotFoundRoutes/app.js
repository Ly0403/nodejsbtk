const express = require('express');

const app = express();

app.listen(3000);

app.get('/', (req, res, next)=>{
  res.send('Home Page');
});

// Route for not existed routes
app.use((req, res, next)=>{
  res.status(404).send('404 Error');
});
