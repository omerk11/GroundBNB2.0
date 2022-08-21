const authJwt = require("../middlewares/authJwt");

const reservationsService = require('../services/reservations.service');

const getAllReservations = async (req, res, next) => {
    console.log("reservations getAllReservations");
    result = await reservationsService.getAllReservations();
    console.log(result);
    console.log("end getAllReservations");
    res.status(200).send(result);
};

const getAllReservationsByQuery = async (req, res, next) => {//TODO
    let query = req.body;

    if (!query.buyerid && !query.ownerid && !(await authJwt.isCurrentUserAdmin(req))) {
        res.status(401).send([]);
        return;
    }
    
    //console.log(query);
    //console.log("reservations getAllReservationsByQuery");
    result = await reservationsService.getAllReservationsByQuery(query);
    console.log(result);
    //console.log("end getAllReservationsByQuery");
    res.status(200).send(result);
};

const addReservation = async (req, res, next) => {
    reservation = req.body;
    console.log("reservations addReservation");
    result = await reservationsService.addReservation(reservation);
    console.log(result);
    console.log("end addReservation");
    res.status(200).send(result);
};

const deleteReservationById = async (req, res, next) => {
    id = req.params.id;
    console.log("reservations deleteReservationById");
    // console.log(id);
    result = await reservationsService.deleteReservationById(id);
    // console.log(result);
    console.log("end deleteReservationById");
    res.status(200).send(result);
};

const updateReservationById = async (req, res, next) => {
    id = req.params.id;
    updates = req.body;
    console.log("reservations updateReservationById");
    result = await reservationsService.updateReservationById(id, updates);
    console.log(result);
    console.log("end updateReservationById");
    res.status(200).send(result);
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

const getReservationtsByBuyerQuery = async (req, res, next) => {//TODO
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
    // console.log(id);
    console.log("reservations getReservationtByOwnerId");
    result = await reservationsService.getReservationtsByOwnerId(id);
    console.log(result);
    console.log("end getReservationtByOwnerId");
    res.status(200).send(result);
}

const getReservationsPerDay = async (req, res, next) => {
    result = await reservationsService.getReservationsPerDay();
    res.status(200).send(result);
}

const getReservationtsByOwnerQuery = async (req, res, next) => {//TODO
    id = req.params.id;
    // console.log(id);
    console.log("reservations getReservationtByOwnerId");
    result = await reservationsService.getReservationtsByOwnerId(id);
    console.log(result);
    console.log("end getReservationtByOwnerId");
    res.status(200).send(result);
}

const getTotalSpendings = async (req, res, next) => {
    id = req.params.id;
    console.log(id);
    console.log("reservations getTotalSpendings");
    result = await reservationsService.getTotalSpendings(id);
    console.log(result);
    console.log("end getTotalSpendings");
    res.status(200).send(result);
}

module.exports = {
    getAllReservations,
    getAllReservationsByQuery,
    addReservation,
    deleteReservationById,
    updateReservationById,
    getReservationtsByBuyerId,
    getReservationtsByBuyerQuery,
    getReservationtsByOwnerId,
    getReservationtsByOwnerQuery,
    getTotalSpendings,
    getReservationsPerDay
};