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

    return response;
};