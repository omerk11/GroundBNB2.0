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
router.get('/api/apartments/:id',[authJwt.verifyToken], apartmentController.getApartmentbyId); 

// Add apartment
router.post('/api/apartments/add',[authJwt.verifyToken],apartmentController.addApartment);

// Delete apartment
router.delete('/api/apartments/delete/:id',[authJwt.verifyToken],apartmentController.deleteApartmentById);

// Update apartment
router.put('/api/apartments/update/:id',[authJwt.verifyToken],apartmentController.updateApartmentById);

// Get all apartments by owner
router.get('/api/apartments/getapartmentsbyownerid/:id',[authJwt.verifyToken],apartmentController.getApartmentsByOwnerId);

// Get apartments by query
router.post('/api/apartments/getapartmentsbyquery',[authJwt.verifyToken],apartmentController.getApartmentsByQuery);

/// ----- Users API ----- ///

// // Get all users
// router.get('/api/users', usersController.getAllUsers); 

// Get user by ID
router.get('/api/users/:id',[authJwt.verifyToken, authJwt.isAdmin], usersController.getUserById)

// Add user
// router.post('/api/users',usersController.addUser);

// Delete user

// Update user
// router.put('/api/users/:id',[authJwt.verifyToken],usersController.updateUserById);


/// ----- Reservations API ----- ///

// Get all reservations
router.get('/api/reservations', [authJwt.verifyToken, authJwt.isAdmin],reservationController.getAllReservations); 

// Get all reservation by query
router.post('/api/reservations/getreservtionsbyquery', [authJwt.verifyToken],reservationController.getAllReservationsByQuery); 


// Add reservation
router.post('/api/reservations/add',[authJwt.verifyToken],reservationController.addReservation);

// Delete reservation
router.delete('/api/reservations/delete/:id',[authJwt.verifyToken],reservationController.deleteReservationById);

// Update reservation
router.put('/api/reservations/update/:id',[authJwt.verifyToken],reservationController.updateReservationById);

// Get all reservations of a buyer id
router.get('/api/reservations/getreservationsbybuyerid/:id',[authJwt.verifyToken],reservationController.getReservationtsByBuyerId);

// Get all reservations of a buyer query
router.post('/api/reservations/getreservationsbybuyerquery',[authJwt.verifyToken],reservationController.getReservationtsByBuyerQuery);

// Get all reservations to my apartments
router.get('/api/reservations/getreservationsbyownerid/:id',[authJwt.verifyToken],reservationController.getReservationtsByOwnerId);

// Get all reservations to my apartments query
router.post('/api/reservations/getreservationsbyownerquery',[authJwt.verifyToken],reservationController.getReservationtsByOwnerId);


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

// Update user

router.put('/api/auth/updateuser/:id',[authJwt.verifyToken],usersController.updateUserById);
router.get('/api/auth/getuser/:id',[authJwt.verifyToken],usersController.getUserById);

router.delete('/api/auth/deleteuser/:id',[authJwt.verifyToken], usersController.deleteUserById);

// router.get("/api/test/all", authorizationController.allAccess);
// router.get("/api/test/user", [authJwt.verifyToken], authorizationController.userBoard);
// router.get(
// "/api/test/admin",
// [authJwt.verifyToken, authJwt.isAdmin],
// authorizationController.adminBoard
// );

module.exports = router; // export to use in server.js
