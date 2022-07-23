const express = require('express');
const cors = require('cors');

const app = express().use(express.urlencoded({ extended: false }))
.use(express.json());
const router = require('./routes');
app.use(cors());

app.use('/',router);

app.use('/hello', function(req, res) {
    res.send('Hello World!')
  });


module.exports = app;