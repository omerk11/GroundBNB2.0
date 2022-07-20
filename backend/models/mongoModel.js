const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:1q2w3e@cluster0.hd0gejt.mongodb.net/?retryWrites=true&w=majority";


// ----------- Apartments Queries -----------
// get all apartments
exports.getAllApartments = async function(){
  try{
    MongoClient.connect(uri, function(err, db) {
      if (err) throw err;
      var dbo = db.db("tables");
      dbo.collection("apartments").find({}).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        console.log(result);
        return(result);
      });
    });
  } catch (error){
    console.error(error);
  };
};
exports.AddApartment = async function(){};
exports.DeleteApartment = async function(){};
exports.UpdateApartment = async function(){};

// add apartment
// delete apartment
// update apartment

// ----------- Users Queries -----------
// get all users
// add user
// delete user
// update user

// ----------- Reservations Queries -----------
// get all reservations
// add reservation
// delete reservation
// update reservations

