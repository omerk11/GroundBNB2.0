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

exports.getUserById = async function(userId) {
    let response = {message: '', data : ''}
    let result = await mongoModel.getById(table,userId);
    response.data = result
    if(!result){
        response.message = 'Didnt find any users';
    }
    else{
        response.message = 'Users fetched succussfully';
    }
    //TODO: validation and create response

    return response;
};

exports.addUser = async function(user){
    let response = {message: '', data : ''}
    let res = await mongoModel.addElement(table,user);
    if(res.acknowledged == true){
        response.message = "Succussfully added user";
        response.data = res.insertedId;
    }
    else{
        response.message = "Failed to add user";
        response.data = res;
    }

    return response;
}

exports.deleteUserById = async function(userId){
    let result = await mongoModel.deleteById(table,userId);
    return result;
    //TODO: validation and create response
}

exports.updateUserById = async function(userId,changes){
    let result = await mongoModel.updateElementById(table,userId,changes);
    return result;
}