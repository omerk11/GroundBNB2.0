const { ObjectID, ObjectId } = require('bson');

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:1q2w3e@cluster0.hd0gejt.mongodb.net/?retryWrites=true&w=majority";


const getAll = async (table) =>{
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
    return;
  }
  try {
    const db = client.db('tables');
    let collection = db.collection(table);
    let query = {};
    let res = await collection.find(query).toArray();
    return res;
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

const getById = async  (table, element_id)=> {
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
    return;
  }
  try {
    const db = client.db('tables');
    let collection = db.collection(table);
    let query = { _id: new ObjectId(element_id) };
    let res = await collection.findOne(query);
    return res;
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

const addElement = async  (table, element) => {
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
    return;
  }
  try {
    const db = client.db('tables');
    switch (table) {
      case "apartments":
        element.ownerid = new ObjectId(element.ownerid);
        break;
      case "reservations":
        element.ownerid = new ObjectId(element.ownerid);
        element.buyerid = new ObjectId(element.buyerid);
        element.apartmentid = new ObjectId(element.apartmentid);
        break;
      default:
        break;
    }
    let collection = db.collection(table);
    let res = await collection.insertOne(element);
    return res;
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

const deleteById = async  (table, element_id) =>{
  //console.log("mongo deleteById")
  //console.log(element_id);
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
    return;
  }
  try {
    const db = client.db('tables');
    let collection = db.collection(table);
    let query = { _id: new ObjectId(element_id) };
    let res = await collection.deleteOne(query);
    return res;
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

const updateElementById = async  (table, id, updates) =>{
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
    return;
  }
  try {
    if(updates._id){
      delete updates._id;
    }
    switch (table) {
      case "apartments":
        updates.ownerid = new ObjectId(updates.ownerid);
        break;
      case "reservations":
        updates.ownerid = new ObjectId(updates.ownerid);
        updates.buyerid = new ObjectId(updates.buyerid);
        updates.apartmentid = new ObjectId(updates.apartmentid);
        break;
      default:
        break;
    }

    const db = client.db('tables');
    let collection = db.collection(table);
    let query = { _id: new ObjectId(id) };
    let newvalues = { $set: updates };
    let res = await collection.updateOne(query, newvalues);
    // //console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

const getAllElementsByUserID = async (table, userID) =>{
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
    return;
  }
  try {
    let query = '';
    if (table === 'apartments') {
      query = { ownerid: new ObjectId(userID) }
    }
    else {
      query = { buyerid: new ObjectId(userID) }
    }
    const db = client.db('tables');
    let collection = db.collection(table);
    let res = await collection.find(query).toArray();
    return res;
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }

}
const getReservationtsByOwnerId = async (table, userID,param) =>{
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
    return;
  }
  try {
    const db = client.db('tables');
    let collection = db.collection(table);
    let query = {};
    query[param] =  new ObjectId(userID);
    let res = await collection.find(query).toArray();
    let allReservations = []
    for (let reservation in res) {
        let newReservation = await getReservationById(table,reservation._id);
        allReservations.push(newReservation);
      }
    console.log(allReservations);
    return allReservations;
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

const getApartmentsByQuery = async (table,query) => {
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
    return;
  }

  try {
    const db = client.db('tables');
    let collection = db.collection(table);
    let match = {
      $match: {
        $and: []
      }
    };
    let aggregateContent = [];
    if (query.city) {
      aggregateContent.push({ $addFields: { containsCity: { $regexMatch: { input: "$city", regex: new RegExp(query.city,"g") } } } });
      match.$match.$and.push({
        $expr: {
          $eq: ["$containsCity", true]
        }
      });
    }

    if (query.maxprice) {
      match.$match.$and.push({
        $expr: {
          $lte: ["$price", query.maxprice]
        }
      });
    }

    if (query.minvisitors) {
      match.$match.$and.push({
        $expr: {
          $lte: ["$maxvisitors", query.minvisitors]
        }
      });
    }
    if (match.$match.$and.length > 0) {
      aggregateContent.push(match);
    }
    let sortParam = query.sortorder;
    let sortValue = 1;
    if (sortParam.includes("_desc")) {
      sortParam = sortParam.split("_")[0];
      sortValue = -1;
    }
    aggregateContent.push({
      $sort: {
        [sortParam]: sortValue
      }
    });
    //console.log("-------")
    //console.log(JSON.stringify(aggregateContent));
    //console.log("-------")
    let res = await collection.aggregate(aggregateContent).toArray();
    // //console.log(res);
    return res;
  } catch (err) { 
    //console.log("failed to fetch by query");
    console.log(err);
  }
  finally {
    client.close();
  }
}

const getReservationById = async (table,reservationId)=>{
  const client = await MongoClient.connect(uri).catch(err => {console.log(err); });

  if (!client) {
    return;
  }
  try {
    const db = client.db('tables');
    let collection = db.collection(table);
    let query = { _id: new ObjectId(reservationId) };
    let reservation = await collection.findOne(query);
    let apartment = await getById('apartments',reservation.apartmentid);
    let user = await getById('users',reservation.ownerid);
    reservation['apartmentname'] = apartment.name;
    reservation['ownername'] = user.firstname + " " +user.lastname;
    return reservation;
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

module.exports = {
  getAll,
  getById,
  addElement,
  deleteById,
  updateElementById,
  getAllElementsByUserID,
  getReservationtsByOwnerId,
  getApartmentsByQuery,
  getReservationById
}