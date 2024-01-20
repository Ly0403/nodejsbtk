/* eslint-disable new-cap */
const express = require('express');

const router = express.Router();


router.get('/', (req, res, next)=>{
  res.render('user', {
    title: 'Users',
    path: 'user',
  });
});

module.exports = router;
