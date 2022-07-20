const apartmentService = require('../services/apartments.service');

exports.eventParser = async function(req,res){
    let result;
    let id;
    let apartment;
    let updates;
    // console.log(req.body);
    switch(req.body.type){
        case 'getAllApartments':
            console.log("apartment getAllApartment");
            result = await apartmentService.getAllApartments();
            console.log(result);
            console.log("end getAllApartment");
            break;
        case 'getApartmentById':
            id = req.body.id;
            console.log("apartment getApartmentById");
            console.log(id);
            result = await apartmentService.getApartmentById(id);
            console.log(result);
            console.log("end test");
            break;
        case 'deleteApartmentById':
            id = req.body.id;
            console.log("apartment deleteApartmentById");
            console.log(id);
            result = await apartmentService.deleteApartmentById(id);
            console.log(result);
            console.log("end test");
            break;
        case 'addApartment':
            apartment = JSON.parse(req.body.element);
            console.log(apartment);
            console.log("apartment addApartment");
            result = await apartmentService.addApartment(apartment);
            console.log(result);
            console.log("end test");
            break;
        case 'updateApartment':
            id = req.body.id;
            updates = JSON.parse(req.body.updates);
            console.log("apartment updateApartment");
            result = await apartmentService.updateApartmentById(id,updates);
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

