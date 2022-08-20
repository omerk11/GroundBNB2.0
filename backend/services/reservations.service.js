const mongoModel = require('../models/mongoModel');
const table = 'reservations';

const getAllReservations = async () =>{
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

const getAllReservationsByQuery = async (query) =>{
    let result = await mongoModel.getReserationsByQuery(table,query);
    return result;
};

const addReservation = async (reservation)=>{
    let res = await mongoModel.addElement(table,reservation);

    return reservation;
}

const getReservationById = async (reservationId)=>{ 
    let result = await mongoModel.getById(table,reservationId);
    return result;
}

const deleteReservationById = async (reservationId)=>{
    let result = await mongoModel.deleteById(table,reservationId);
    return result;
    //TODO: validation and create response
}

const updateReservationById = async (reservationId,changes)=>{
    const result = await mongoModel.updateElementById(table,reservationId,changes);
    let newReservation;
    if (result.acknowledged){
        newReservation = await getReservationById(reservationId);
    }
    return newReservation;
}

const getReservationtsByBuyerId = async (userId)=>{ 
    let result = await mongoModel.getAllElementsByUserID(table,userId);
    return result;
}

const getReservationtsByOwnerId = async (userId)=>{ 
    let result = await mongoModel.getReservationtsByOwnerId(table,userId);
    return result;
}

const getTotalSpendings = async (userId)=>{
    let result = await mongoModel.getTotalSpendings(table,userId);
    return result;
}

module.exports = {
    getAllReservations,
    getAllReservationsByQuery,
    addReservation,
    getReservationById,
    deleteReservationById,
    updateReservationById,
    getReservationtsByBuyerId,
    getReservationtsByOwnerId,
    getTotalSpendings
};