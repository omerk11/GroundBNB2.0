const express = require('express');
const app = express().use(express.urlencoded({ extended: false }))
.use(express.json());
const router = require('./routes');

app.use('/',router);

app.use('/hello', function(req, res) {
    res.send('Hello World!')
  });


module.exports = app;