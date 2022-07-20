const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:1q2w3e@cluster0.hd0gejt.mongodb.net/?retryWrites=true&w=majority";


// ----------- Apartments Queries -----------
exports.getAllApartments = async function(){
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
      return;
  }
  try {
    const db = client.db('tables');
    let collection = db.collection('apartments');
    let query = {};
    let res = await collection.find(query).toArray();
    return res;
  } catch (error) {
    console.error(error);
  }finally{
    client.close();
  }
}

exports.getApartmentById = async function(apartmentId){
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
      return;
  }
  try {
    const db = client.db('tables');
    let collection = db.collection('apartments');
    let query = {id : apartmentId};
    let res = await collection.findOne(query).toArray();
    return res;
  } catch (error) {
    console.error(error);
  }finally{
    client.close();
  }
}
exports.addApartment = async function(apartment){
    const client = await MongoClient.connect(uri).catch(err => { console.log(err); });
  
    if (!client) {
        return;
    }
    try {
      const db = client.db('tables');
      let collection = db.collection('apartments');
      let res = await collection.insertOne(apartment);
      return res;
    } catch (error) {
      console.error(error);
    }finally{
      client.close();
    }
  }


exports.deleteApartmentById = async function(){
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
      return;
  }
  try {
    const db = client.db('tables');
    let collection = db.collection('apartments');
    let query = {id : apartmentId};
    let res = await collection.deleteOne(query).toArray();
    return res;
  } catch (error) {
    console.error(error);
  }finally{
    client.close();
  }
}
exports.updateApartmentById = async function(){};


// ----------- Users Queries -----------
// get all users
exports.getAllUsers = async function(){
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
      return;
  }
  try {
    const db = client.db('tables');
    let collection = db.collection('users');
    let query = {};
    let res = await collection.find(query).toArray();
    return res;
  } catch (error) {
    console.error(error);
  }finally{
    client.close();
  }
}
// add user
// delete user
// update user

// ----------- Reservations Queries -----------
// get all reservations
exports.getAllReservations = async function(){
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
      return;
  }
  try {
    const db = client.db('tables');
    let collection = db.collection('reservations');
    let query = {};
    let res = await collection.find(query).toArray();
    return res;
  } catch (error) {
    console.error(error);
  }finally{
    client.close();
  }
}
// add reservation
// delete reservation
// update reservations

