const usersService = require('../services/users.service');

exports.eventParser = async function(req,res){
    let result = await usersService.test();
    result = result[0];
    console.log(JSON.stringify(result))
    console.log('done')
    return res.status(200).send(JSON.stringify(result));
};
