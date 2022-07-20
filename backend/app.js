const express = require('express');
const app = express()
const swaggerUi =require('swagger-ui-express')
const usersController = require('./controllers/users.controller.js');
const apartmentsController = require('./controllers/apartments.controller.js');
const reservationController = require('./controllers/reservations.controller.js');
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

app.use('/api/apartments',apartmentsController.eventParser);
app.use('/api/users',usersController.eventParser);
app.use('/api/reservations',reservationController.eventParser);

app.use('/hello', function(req, res) {
    res.send('Hello World!')
  });
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = app;