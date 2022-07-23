const apartmentService = require('../services/apartments.service');


const getAllApartments = async (req, res, next) => {
    console.log("apartment getAllApartment");
    let result = await apartmentService.getAllApartments();
    console.log(result);
    console.log("end getAllApartment");
    res.status(200).send(result);
};

const addApartment = async (req, res, next) => {
    let apartment = req.body;
    console.log("apartment addApartment");
    let result = await apartmentService.addApartment(apartment);
    console.log(result);
    console.log("end test");
    res.status(200).send();
};

const deleteApartmentById = async (req, res, next) => {
    let id = req.params.id;
    console.log("apartment deleteApartmentById");
    console.log(id);
    let result = await apartmentService.deleteApartmentById(id);
    console.log(result);
    console.log("end test");
    res.status(200).send('ok');
};

const updateApartmentById = async (req, res, next) => {
    let id = req.params.id;
    let updates = req.body;
    console.log("apartment updateApartment");
    console.log(id);
    console.log(updates);
    let result = await apartmentService.updateApartmentById(id,updates);
    console.log(result);
    console.log("end test");
    res.status(200).send('ok');
};

module.exports = {
    getAllApartments, 
    addApartment,
    deleteApartmentById,
    updateApartmentById
};
