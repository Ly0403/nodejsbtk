/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

router.get('/info', (req, res, next)=>{
  res.send('User Page');
});

module.exports = router;
