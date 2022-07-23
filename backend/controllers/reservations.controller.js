const reservationsService = require('../services/reservations.service');

const getAllReservations = async (req, res, next) => {
    console.log("reservations getAllReservations");
    result = await reservationsService.getAllReservations();
    console.log(result);
    console.log("end getAllReservations");
    res.status(200).send(result);
};


module.exports = {
    getAllReservations
};