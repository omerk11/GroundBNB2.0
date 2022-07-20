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

    return response;
};

exports.addApartment = async function(apartment){
    let res = await mongoModel.addElement(table,apartment);
    //TODO: validation and create response

    return res;
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