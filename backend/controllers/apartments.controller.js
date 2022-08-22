const { MongoMissingCredentialsError } = require('mongodb');
const apartmentService = require('../services/apartments.service');


const getAllApartments = async (req, res, next) => {
    console.log("apartment getAllApartment");
    let result = await apartmentService.getAllApartments();
    // console.log(result);
    console.log("end getAllApartment");
    res.status(200).send(result);
};

const getApartmentbyId = async (req, res, next) => {
    id = req.params.id;
    // console.log("apartment getApartmentbyId" + id);
    result = await apartmentService.getApartmentById(id);
    // console.log(result);
    // console.log("end getApartmentbyId");
    res.status(200).send(result);
};

const addApartment = async (req, res, next) => {
    let apartment = req.body;
    console.log("apartment addApartment");
    let result = await apartmentService.addApartment(apartment);
    // console.log(result);
    console.log("end addApartment");
    res.status(200).send(result);
};

const deleteApartmentById = async (req, res, next) => {
    let id = req.params.id;
    // console.log("apartment deleteApartmentById");
    // console.log(id);
    let result = await apartmentService.deleteApartmentById(id);


    // console.log(result);
    // console.log("end deleteApartmentById");
    res.status(200).send(result);
};

const updateApartmentById = async (req, res, next) => {
    id = req.params.id;
    // console.log(id);
    updates = req.body;
    // console.log(updates);
    console.log("apartment updateApartment");
    result = await apartmentService.updateApartmentById(id,updates);
    // console.log(result);
    console.log("end updateApartment");
    res.status(200).send(result);
};

const getApartmentsByOwnerId = async(req, res, next)=>{
    id = req.params.id;
    // console.log(id);
    // console.log("apartment getApartmentByUserId");
    result = await apartmentService.getApartmentsByOwnerId(id);
    // console.log(result);
    // console.log("end getApartmentByUserId");
    res.status(200).send(result);
};

const getApartmentsByQuery = async(req, res, next)=>{
    let query = req.body;
    // console.log("apartment getApartmentsByQuery");
    // console.log(query);
    result = await apartmentService.getApartmentsByQuery(query);
    // console.log(result);
    // console.log("end getApartmentsByQuery");
    res.status(200).send(result);
};

module.exports = {
    getAllApartments, 
    addApartment,
    deleteApartmentById,
    updateApartmentById,
    getApartmentbyId,
    getApartmentsByOwnerId,
    getApartmentsByQuery
};
