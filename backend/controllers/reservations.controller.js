const reservationsService = require('../services/reservations.service');

const getAllReservations = async (req, res, next) => {
    console.log("reservations getAllReservations");
    result = await reservationsService.getAllReservations();
    console.log(result);
    console.log("end getAllReservations");
    res.status(200).send(result);
};

const addReservation = async (req, res, next) => {
    reservation = req.body;
    console.log("reservations addReservation");
    result = await reservationsService.addReservation(reservation);
    console.log(result);
    console.log("end addReservation");
    res.status(200).send();
};

const deleteReservationById = async (req, res, next) => {
    id = req.params.id;
    console.log("reservations deleteReservationById");
    console.log(id);
    result = await reservationsService.deleteReservationById(id);
    console.log(result);
    console.log("end deleteReservationById");
    res.status(200).send('ok');
};

const updateReservationById = async (req, res, next) => {
    id = req.params.id;
    updates = req.body.updates;
    console.log("reservations updateReservationById");
    result = await reservationsService.updateReservationById(id,updates);
    console.log(result);
    console.log("end updateReservationById");
    res.status(200).send('ok');
};

const getReservationtsByBuyerId = async (req, res, next) => {
    id = req.params.id;
    console.log(id);
    console.log("reservations getReservationtByBuyerId");
    result = await reservationsService.getReservationtsByBuyerId(id);
    console.log(result);
    console.log("end getReservationtByBuyerId");
    res.status(200).send(result);
}

const getReservationtsByOwnerId = async (req, res, next) => {
    id = req.params.id;
    console.log(id);
    console.log("reservations getReservationtByOwnerId");
    result = await reservationsService.getReservationtsByOwnerId(id);
    console.log(result);
    console.log("end getReservationtByOwnerId");
    res.status(200).send(result);
}


module.exports = {
    getAllReservations,
    addReservation,
    deleteReservationById,
    updateReservationById,
    getReservationtsByBuyerId,
    getReservationtsByOwnerId
};