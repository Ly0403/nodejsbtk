const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.listen(3000);

app.use('/', bodyParser.urlencoded({extended: false}));

app.get('/addProduct', (req, res, next)=>{
  res.send(`
      <html>
        <body>
            <form action="/addProduct" method="POST">
                <input type="text" name="name">
                <input type="submit">
            </form>
        </body>
      </html>
  `);
});


app.post('/addProduct', (req, res, next)=>{
  console.log(req.body);
  res.redirect('/addProduct');
});

