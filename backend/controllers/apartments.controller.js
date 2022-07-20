const apartmentService = require('../services/apartments.service');

exports.eventParser = async function(req,res){
    
    console.log("apartment controller start");
    let result = await apartmentService.getAllApartments();
    console.log(result)
    console.log("end controller apartment")
    return res.status(200).send(result)
};

