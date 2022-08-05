const { ObjectID, ObjectId } = require('bson');

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:1q2w3e@cluster0.hd0gejt.mongodb.net/?retryWrites=true&w=majority";


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
    let query = {_id : new ObjectId(element_id)};
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
    switch (table){
      case "apartments":
        element.ownerid = new ObjectId(element.ownerid);
        break;
      case "reservations":
        element.ownerid = new ObjectId(element.ownerid);
        element.buyerid = new ObjectId(element.buyerid);
        break;     
      default:
        break;
    }
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

exports.getAllElementsByUserID = async function(table,userID){
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });
  
  if (!client) {
    return;
  }
  try {
    let query = '';
    if(table === 'apartments'){
      query = {ownerid : new ObjectId(userID)}
    }
    else{
      query = {buyerid : new ObjectId(userID)}
    }
    const db = client.db('tables');
    let collection = db.collection(table);
    let res = await collection.find(query).toArray();
  return res;
} catch (error) {
  console.error(error);
}finally{
  client.close();
}

}
exports.getReservationtsByOwnerId = async function(table,userID){
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });
  
  if (!client) {
    return;
  }
  try {
    const db = client.db('tables');
    let collection = db.collection(table);
    let query = {ownerid : userID}
    let res = await collection.find(query).toArray();
  return res;
} catch (error) {
  console.error(error);
}finally{
  client.close();
}

