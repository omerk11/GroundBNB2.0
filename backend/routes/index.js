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

// Get user by ID
router.get('/api/users/:id', usersController.getUserById)

// Add user
router.post('/api/users',usersController.addUser);

// Delete user
router.delete('/api/users/:id',usersController.deleteUserById);

// Update apartment
router.put('/api/users/:id',usersController.updateUserById);


/// ----- Reservations API ----- ///

// Get all reservations
router.get('/api/reservations', reservationController.getAllReservations); 

// Add reservation
router.post('/api/reservations',reservationController.addReservation);

// Delete reservation
router.delete('/api/reservations/:id',reservationController.deleteReservationById);

// Update reservation
router.put('/api/reservations/:id',reservationController.updateReservationById);


module.exports = router; // export to use in server.js
