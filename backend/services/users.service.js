const mongoModel = require('../models/mongoModel');
const table = 'users';
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const getAllUsers = async (req,res)=> {
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

const getUserById = async (userId) =>{
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

    return result;
};

const addUser = async (user)=>{
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

const deleteUserById = async (userId)=>{
    let result = await mongoModel.deleteById(table,userId);
    return result;
    //TODO: validation and create response
}

const getUserByEmail = async (email) => {
  return await User.findOne({ email }).exec();
}
const updateUserById = async (userId,changes)=>{
    // Validate users password
    // console.log(changes);

    const user = await getUserByEmail(changes.email);
    if(!user) {
      console.error("user does not exists");
      throw new Error("error");
    }

  const passwordIsValid = bcrypt.compareSync(
    changes.password,
    user.password
  );

  if (!passwordIsValid) {
    console.log('user failed to login - Invalid Password!')
    return { error: "Invalid Password!" };
  }

  if (changes.newpassword) {
    changes.password = bcrypt.hashSync(changes.newpassword);
    delete changes.newpassword;
  } else {
    changes.password = bcrypt.hashSync(changes.password);
  }

  const result = await mongoModel.updateElementById(table,userId,changes);
  let newUser = null;
  if (result.acknowledged){
      newUser = await getUserById(userId);
  }
  if(newUser === null) {
    return { error: "could not fetch updated user"};
  }

  delete newUser.password;
  delete newUser.apartments;
  delete newUser.reservations;
  delete newUser.__v;

  return newUser;

}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUserById,
    updateUserById
};