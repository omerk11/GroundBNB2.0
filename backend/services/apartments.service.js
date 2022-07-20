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
    let result = await mongoModel.getElementById(table,apartmentId);
    //TODO: validation and create response
}