const usersService = require('../services/users.service');

const getAllUsers = async (req, res, next) => {
    console.log("reservations getAllUsers");
    result = await usersService.getAllUsers();
    console.log(result);
    console.log("end getAllUsers");
    res.status(200).send(result);
};


module.exports = {
    getAllUsers
};
