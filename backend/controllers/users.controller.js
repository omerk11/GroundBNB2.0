const usersService = require('../services/users.service');

const getAllUsers = async (req, res, next) => {
    console.log("users getAllUsers");
    result = await usersService.getAllUsers();
    console.log(result);
    console.log("end getAllUsers");
    res.status(200).send(result);
};

const getUserById = async (req, res, next) => {
    let id = req.params.id;
    console.log("users getUserById");
    result = await usersService.getUserById(id);
    console.log(result);
    console.log("end getUserById");
    res.status(200).send(result);
};

const addUser = async (req, res, next) => {
    let user = req.body;
    console.log("users addUser");
    result = await usersService.addUser(user);
    console.log(result);
    console.log("end addUser");
    res.status(200).send();
};

const deleteUserById = async (req, res, next) => {
    id = req.params.id;
    console.log("users deleteUserById");
    console.log(id);
    result = await usersService.deleteUserById(id);
    console.log(result);
    console.log("end deleteUserById");
    res.status(200).send('ok');
};

const updateUserById = async (req, res, next) => {
    id = req.params.id;
    updates = req.body;
    console.log("users updateUserById");
    // console.log(id);
    // console.log(updates);
    result =  await usersService.updateUserById(id,updates);
    // result = await usersService.updateUserById(id,updates);
    // console.log(result);
    // console.log("end updateUserById");
    res.status(200).send(result);
};
module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUserById,
    updateUserById
};
