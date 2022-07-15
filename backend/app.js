const express = require('express');
const app = express()
const swaggerUi =require('swagger-ui-express')
// import {swaggerDocument} from "./swagger"
swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'GroundBNB 2.0 swagger',
        termsOfService: ''
    }
}

app.use('/hello', function(req, res) {
    res.send('Hello World!')
  });
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = app;