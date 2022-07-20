const mongoModel = require('../models/mongoModel');
const table = 'apartments';


exports.test = async function(){
    return('apartments')
};

exports.getAllApartments = async function() {
    let result = await mongoModel.getAll(table);
    //TODO: validation and create response

      if (err) throw err;
      return(result);
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