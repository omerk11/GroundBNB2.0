const express = require('express');
const router  = express.Router(); 
const { verifySignUp } = require("../middlewares");
const { authJwt } = require("../middlewares");
const authenticationController = require("../controllers/auth.controller");
const authorizationController = require("../controllers/authorization.controller");

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
// router.post('/api/users',usersController.addUser);

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

/// ----- Authentication API ----- ///
router.post(
    "/api/users",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authenticationController.signup
  );
  router.post("/auth/signin", authenticationController.signin);
  router.post("/api/auth/signout", authenticationController.signout);

  router.get("/api/test/all", authorizationController.allAccess);
  router.get("/api/test/user", [authJwt.verifyToken], authorizationController.userBoard);
  router.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    authorizationController.adminBoard
  );

module.exports = router; // export to use in server.js
