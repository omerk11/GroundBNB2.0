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

// Get apartment by id
router.get('/api/apartments/:id', apartmentController.getApartmentbyId); 

// Add apartment
router.post('/api/apartments',apartmentController.addApartment);

// Delete apartment
router.delete('/api/apartments/:id',apartmentController.deleteApartmentById);

// Update apartment
router.put('/api/apartments/:id',apartmentController.updateApartmentById);

// Get all apartments by owner
router.get('/api/apartments/getapartmentsbyownerid/:id',apartmentController.getApartmentsByOwnerId);


/// ----- Users API ----- ///

// // Get all users
// router.get('/api/users', usersController.getAllUsers); 

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

// Get all reservations of a buyer id
router.get('/api/reservations/getreservationsbybuyerid/:id',reservationController.getReservationtByBuyerId);

// Get all reservations to my apartments
router.get('/api/reservations/getreservationsbyownerid/:id',reservationController.getReservationtByOwnerId);


/// ----- Authentication API ----- ///

// User sign up
router.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authenticationController.signup
  );

// User login
router.post("/api/auth/login", authenticationController.login); 

// User logout
router.post("/api/auth/logout", authenticationController.logout);

// Get all users
router.get('/api/auth/users',[authJwt.verifyToken, authJwt.isAdmin], authenticationController.getUsersList);

router.get("/api/test/all", authorizationController.allAccess);
router.get("/api/test/user", [authJwt.verifyToken], authorizationController.userBoard);
router.get(
"/api/test/admin",
[authJwt.verifyToken, authJwt.isAdmin],
authorizationController.adminBoard
);

module.exports = router; // export to use in server.js
