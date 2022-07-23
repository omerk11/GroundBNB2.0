const mongoModel = require('../models/mongoModel');
const table = 'users';

exports.getAllUsers = async function() {
    let response = {message: '', data : ''}
    let result = await mongoModel.getAll(table);
    response.data = result
    if(result.length == 0){
        response.message = 'Didnt find any users';
    }
    else{
        response.message = 'Users fetched succussfully';
    }
    //TODO: validation and create response

    return response;
};