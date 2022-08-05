const mongoModel = require('../models/mongoModel');
const table = 'reservations';

exports.getAllReservations = async function() {
    let response = {message: '', data : ''}
    let result = await mongoModel.getAll(table);
    response.data = result
    if(result.length == 0){
        response.message = 'Didnt find any reservations';
    }
    else{
        response.message = 'Reservations fetched succussfully';
    }
    //TODO: validation and create response

    return result;
};

exports.addReservation = async function(reservation){
    let res = await mongoModel.addElement(table,reservation);
    // if(res.acknowledged == true){
    //     response.message = "Succussfully added reservation";
    //     response.data = res.insertedId;
    // }
    // else{
    //     response.message = "Failed to add reservation";
    //     response.data = res;
    // }

    return res;
}


exports.deleteReservationById = async function(reservationId){
    let result = await mongoModel.deleteById(table,reservationId);
    return result;
    //TODO: validation and create response
}

exports.updateReservationById = async function(reservationId,changes){
    let result = await mongoModel.updateElementById(table,reservationId,changes);
    return result;
}

exports.getReservationtsByBuyerId = async function(userId){ 
    let result = await mongoModel.getAllElementsByUserID(table,userId);
    return result;
}

exports.getReservationtsByOwnerId = async function(userId){ 
    let result = await mongoModel.getReservationtsByOwnerId(table,userId);
    return result;
}