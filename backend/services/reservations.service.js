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
    let result = await mongoModel.getReservationtsByOwnerId(table,userId,'buyerid');
    return result;
}

const getReservationtsByOwnerId = async (userId)=>{ 
    let result = await mongoModel.getReservationtsByOwnerId(table,userId,'ownerid');
    return result;
}

module.exports = {
    getAllReservations,
    addReservation,
    getReservationById,
    deleteReservationById,
    updateReservationById,
    getReservationtsByBuyerId,
    getReservationtsByOwnerId
    
};