const apartmentService = require('../services/apartments.service');

exports.eventParser = async function(req,res){
    console.log("apartment");
    let result = await apartmentService.getAllApartments();
    console.log(result)
    console.log("end")
    return res.status(200).send(result)
};