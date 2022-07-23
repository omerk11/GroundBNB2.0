const express = require('express');
const router  = express.Router(); 
const apartmentController = require('../controllers/apartments.controller'); 
const reservationController = require('../controllers/reservations.controller');
const usersController = require('../controllers/users.controller');



/// ----- Apartments API ----- ///

// Get all apartments
router.get('/api/apartments', apartmentController.getAllApartments); 

// Add apartment
router.post('/api/apartments',apartmentController.addApartment);

// Delete apartment
router.delete('/api/apartments/:id',apartmentController.deleteApartmentById);

// Update apartment
router.put('/api/apartments/:id',apartmentController.updateApartmentById);

/// ----- Users API ----- ///
// Get all users

router.get('/api/users', usersController.getAllUsers); 

/// ----- Reservations API ----- ///
// Get all reservations
router.get('/api/reservations', reservationController.getAllReservations); 

module.exports = router; // export to use in server.js
