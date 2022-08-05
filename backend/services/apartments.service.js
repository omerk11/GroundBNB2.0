const mongoModel = require('../models/mongoModel');
const table = 'apartments';

exports.test = async function(){
    return('apartments')
};

exports.getAllApartments = async function() {
    let response = {message: '', data : ''}
    let result = await mongoModel.getAll(table);
    response.data = result
    if(result.length == 0){
        response.message = 'Didnt find any apartments';
    }
    else{
        response.message = 'Apartments fetched succussfully';
    }
    //TODO: validation and create response

    return result;
};

exports.addApartment = async function(apartment){
    let response = {message: '', data : ''}
    let res = await mongoModel.addElement(table,apartment);
    if(res.acknowledged == true){
        response.message = "Succussfully added apartment";
        response.data = res.insertedId;
    }
    else{
        response.message = "Failed to add apartment";
        response.data = res;
    }

    return response;
}

exports.getApartmentById = async function(apartmentId){
    let result = await mongoModel.getById(table,apartmentId);
    return result;
    //TODO: validation and create response
}

exports.deleteApartmentById = async function(apartmentId){
    let result = await mongoModel.deleteById(table,apartmentId);
    return result;
    //TODO: validation and create response
}

exports.updateApartmentById = async function(apartmentId,changes){
    let result = await mongoModel.updateElementById(table,apartmentId,changes);
    return result;
}

exports.getApartmentsByOwnerId = async function(userId){ 
    let result = await mongoModel.getAllElementsByUserID(table,userId);
    return result;
}

exports.getApartmentsByQuery = async function(query){
    let res = await mongoModel.getApartmentsByQuery(query);
    
}