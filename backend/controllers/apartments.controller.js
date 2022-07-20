const apartmentService = require('../services/apartments.service');

exports.eventParser = async function(req,res){
    let result;
    console.log(req.body);
    switch(req.body.type){
        case 'getAllApartments':
            console.log("apartment getAllApartment");
            result = await apartmentService.getAllApartments();
            console.log(result);
            console.log("end getAllApartment");
            break;
        case 'test':
            console.log("apartment test");
            result = 'test';
            console.log(result);
            console.log("end test");
            break;
        default:
            console.log("apartment default");
            result = '1232131';
            console.log(result);
            console.log("end default");

    }
    
    return res.status(200).send(result)
};

