const mongoModel = require('../models/mongoModel');
const table = 'users';
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

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
    // Validate users password
    console.log(changes);
    User.findOne({
        email: changes.email,
      })
        .populate("roles", "-__v")
        .exec((err, user) => {
          if (err) {
            console.log('user failed to login 0')
            return { error: err };
          }
          if (!user) {
            console.log('user failed to login - user was not found')
    
            return { error: "User Not found." };
          }
          let passwordIsValid = bcrypt.compareSync(
            changes.password,
            user.password
          );
          if (!passwordIsValid) {
            console.log('user failed to login - Invalid Password!')
            return { error: "Invalid Password!" };
          }});
    // Check if new password exists
        if(changes.newpassword){}
    // let result = await mongoModel.updateElementById(table,userId,changes);
    return;
}