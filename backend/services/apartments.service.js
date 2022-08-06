const mongoModel = require('../models/mongoModel');
const table = 'apartments';

const test = async ()=>{
    return('apartments')
};

const getAllApartments = async () =>{
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

    return result;
};

const addApartment = async (apartment)=>{
    let response = {message: '', data : ''}
    let res = await mongoModel.addElement(table,apartment);
    if(res.acknowledged == true){
        response.message = "Succussfully added apartment";
        response.data = res.insertedId;
    }
    else{
        response.message = "Failed to add apartment";
        response.data = res;
    }

    return response;
}

const getApartmentById = async (apartmentId)=>{
    let result = await mongoModel.getById(table,apartmentId);
    return result;
    //TODO: validation and create response
}

const deleteApartmentById = async (apartmentId)=>{
    let result = await mongoModel.deleteById(table,apartmentId);
    return result;
    //TODO: validation and create response
}

const updateApartmentById = async (apartmentId,changes) =>{

    let result = await mongoModel.updateElementById(table,apartmentId,changes);
    if(result.acknowledged === true)
    {
        let apartment = getApartmentById(apartmentId);
    }
    return apartment;
}

const getApartmentsByOwnerId = async (userId)=>{ 
    let result = await mongoModel.getAllElementsByUserID(table,userId);
    return result;
}

const getApartmentsByQuery = async (query)=>{
    let res = await mongoModel.getApartmentsByQuery(table,query);
    return res;
    
}

module.exports = {
    test,
    getAllApartments,
    addApartment,
    getApartmentById,
    deleteApartmentById,
    updateApartmentById,
    getApartmentsByOwnerId
    ,getApartmentsByQuery

}