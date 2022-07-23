const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:1q2w3e@cluster0.hd0gejt.mongodb.net/?retryWrites=true&w=majority";


// // ----------- Old Queries -----------
// exports.getAllApartments = async function(){
//   const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

//   if (!client) {
//       return;
//   }
//   try {
//     const db = client.db('tables');
//     let collection = db.collection('apartments');
//     let query = {};
//     let res = await collection.find(query).toArray();
//     return res;
//   } catch (error) {
//     console.error(error);
//   }finally{
//     client.close();
//   }
// }

// exports.getApartmentById = async function(apartmentId){
//   const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

//   if (!client) {
//       return;
//   }
//   try {
//     const db = client.db('tables');
//     let collection = db.collection('apartments');
//     let query = {id : apartmentId};
//     let res = await collection.findOne(query);
//     return res;
//   } catch (error) {
//     console.error(error);
//   }finally{
//     client.close();
//   }
// }

// exports.addApartment = async function(apartment){
//     const client = await MongoClient.connect(uri).catch(err => { console.log(err); });
  
//     if (!client) {
//         return;
//     }
//     try {
//       const db = client.db('tables');
//       let collection = db.collection('apartments');
//       let res = await collection.insertOne(apartment);
//       return res;
//     } catch (error) {
//       console.error(error);
//     }finally{
//       client.close();
//     }
// }

// exports.deleteApartmentById = async function(apartmentId){
//   const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

//   if (!client) {
//       return;
//   }
//   try {
//     const db = client.db('tables');
//     let collection = db.collection('apartments');
//     let query = {id : apartmentId};
//     let res = await collection.deleteOne(query);
//     return res;
//   } catch (error) {
//     console.error(error);
//   }finally{
//     client.close();
//   }
// }

// exports.updateApartmentById = async function(apartmentId,updates){
//   const client = await MongoClient.connect(uri).catch(err => { console.log(err); });
  
//     if (!client) {
//         return;
//     }
//     try {
//       const db = client.db('tables');
//       let collection = db.collection('apartments');
//       let query = {id : apartmentId};
//       let newvalues = { $set: updates };
//       let res = await collection.updateOne(query, newvalues);
//       return res;
//     } catch (error) {
//       console.error(error);
//     }finally{
//       client.close();
//     }
// }



// // ----------- Users Queries -----------
// exports.getAllUsers = async function(){
//   const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

//   if (!client) {
//       return;
//   }
//   try {
//     const db = client.db('tables');
//     let collection = db.collection('users');
//     let query = {};
//     let res = await collection.find(query).toArray();
//     return res;
//   } catch (error) {
//     console.error(error);
//   }finally{
//     client.close();
//   }
// }

// exports.getUserById = async function(userId){
//   const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

//   if (!client) {
//       return;
//   }
//   try {
//     const db = client.db('tables');
//     let collection = db.collection('users');
//     let query = {id : userId};
//     let res = await collection.findOne(query);
//     return res;
//   } catch (error) {
//     console.error(error);
//   }finally{
//     client.close();
//   }
// }

// exports.addUser = async function(user){
//   const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

//   if (!client) {
//       return;
//   }
//   try {
//     const db = client.db('tables');
//     let collection = db.collection('users');
//     let res = await collection.insertOne(user);
//     return res;
//   } catch (error) {
//     console.error(error);
//   }finally{
//     client.close();
//   }
// }

// exports.deleteUserById = async function(userId){
//   const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

//   if (!client) {
//       return;
//   }
//   try {
//     const db = client.db('tables');
//     let collection = db.collection('users');
//     let query = {id : userId};
//     let res = await collection.deleteOne(query);
//     return res;
//   } catch (error) {
//     console.error(error);
//   }finally{
//     client.close();
//   }
// }
// // update user

// // ----------- Reservations Queries -----------
// exports.getAllReservations = async function(){
//   const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

//   if (!client) {
//       return;
//   }
//   try {
//     const db = client.db('tables');
//     let collection = db.collection('reservations');
//     let query = {};
//     let res = await collection.find(query).toArray();
//     return res;
//   } catch (error) {
//     console.error(error);
//   }finally{
//     client.close();
//   }
// }

// exports.getReservationById = async function(reservationId){
//   const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

//   if (!client) {
//       return;
//   }
//   try {
//     const db = client.db('tables');
//     let collection = db.collection('reservations');
//     let query = {id : reservationId};
//     let res = await collection.findOne(query);
//     return res;
//   } catch (error) {
//     console.error(error);
//   }finally{
//     client.close();
//   }
// }

// exports.addReservation = async function(reservation){
//   const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

//   if (!client) {
//       return;
//   }
//   try {
//     const db = client.db('tables');
//     let collection = db.collection('reservations');
//     let res = await collection.insertOne(reservation);
//     return res;
//   } catch (error) {
//     console.error(error);
//   }finally{
//     client.close();
//   }
// }

// exports.deleteReservationById = async function(reservationId){
//   const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

//   if (!client) {
//       return;
//   }
//   try {
//     const db = client.db('tables');
//     let collection = db.collection('reservations');
//     let query = {id : reservationId};
//     let res = await collection.deleteOne(query);
//     return res;
//   } catch (error) {
//     console.error(error);
//   }finally{
//     client.close();
//   }
// }
// // update reservations

// /// generic tests 

exports.getAll = async function(table){
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
  }finally{
    client.close();
  }
}

exports.getById = async function(table,element_id){
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
      return;
  }
  try {
    const db = client.db('tables');
    let collection = db.collection(table);
    let query = {id : element_id};
    let res = await collection.findOne(query);
    return res;
  } catch (error) {
    console.error(error);
  }finally{
    client.close();
  }
}

exports.addElement = async function(table,element){
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
      return;
  }
  try {
    const db = client.db('tables');
    let collection = db.collection(table);
    let res = await collection.insertOne(element);
    return res;
  } catch (error) {
    console.error(error);
  }finally{
    client.close();
  }
}

exports.deleteById = async function(table,element_id){
  console.log("mongo deleteById")
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
      return;
  }
  try {
    const db = client.db('tables');
    let collection = db.collection(table);
    let query = {_id : new ObjectId(element_id)};
    let res = await collection.deleteOne(query);
    return res;
  } catch (error) {
    console.error(error);
  }finally{
    client.close();
  }
}

exports.updateElementById = async function(table,id,updates){
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });
  
    if (!client) {
        return;
    }
    try {
      const db = client.db('tables');
      let collection = db.collection(table);
      let query = {_id : new ObjectId(id)};
      let newvalues = { $set: updates };
      let res = await collection.updateOne(query, newvalues);
      return res;
    } catch (error) {
      console.error(error);
    }finally{
      client.close();
    }
}

