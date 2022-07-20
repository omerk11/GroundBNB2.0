const mongoModel = require('../models/mongoModel');



exports.test = async function(){
    return('apartments')
};

exports.getAllApartments = async function(err) {
    if (err) throw err;
    let result = await mongoModel.getAllApartments();
      if (err) throw err;
      return(result);
};
// get all apartments 
// mongo.get
// validations
// return to client

exports.addApartment = async function(apartment){
    let res = await mongoModel.addApartment(apartment);
    return res;
}