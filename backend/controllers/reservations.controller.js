const reservationsService = require('../services/reservations.service');

exports.eventParser = async function(req,res){
    let result = await reservationsService.test();
    return res.status(200).send(result)
};