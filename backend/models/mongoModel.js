const { ObjectID, ObjectId } = require('bson');

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:1q2w3e@cluster0.hd0gejt.mongodb.net/?retryWrites=true&w=majority";


exports.getAll = async function (table) {
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

exports.getById = async function (table, element_id) {
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

exports.addElement = async function (table, element) {
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
        element.startdate = new Date(element.startdate);
        element.enddate = new Date(element.enddate);

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

exports.deleteById = async function (table, element_id) {
  console.log("mongo deleteById")
  console.log(element_id);
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

exports.updateElementById = async function (table, id, updates) {
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
    // console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

exports.getAllElementsByUserID = async function (table, userID) {
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
exports.getReservationtsByOwnerId = async function (table, userID) {
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
    return;
  }
  try {
    const db = client.db('tables');
    let collection = db.collection(table);
    let query = { ownerid: new ObjectId(userID) }
    let res = await collection.find(query).toArray();
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

exports.getApartmentsByQuery = async function (table,query) {
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
    let res = await collection.aggregate(aggregateContent).toArray();
    // console.log(res);
    return res;
  } catch (err) { 
    console.log("failed to fetch by query");
    console.log(err);
  }
  finally {
    client.close();
  }
}

exports.getReserationsByQuery = async function (table,query) {
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
    aggregateContent.push(
      { $lookup:
        {
           from: "apartments",
           localField: "apartmentid",
           foreignField: "_id",
           as: "apartment",
        }
    }
    );
    // if (query.city) {
    //   aggregateContent.push({ $addFields: { containsCity: { $regexMatch: { input: "apartment.city", regex: new RegExp(query.city,"g") } } } });
    //   match.$match.$and.push({
    //     $expr: {
    //       $eq: ["$containsCity", true]
    //     }
    //   });
    // }

    // if (query.name) {
    //   aggregateContent.push({ $addFields: { containsName: { $regexMatch: { input: "$name", regex: new RegExp(query.name,"g") } } } });
    //   match.$match.$and.push({
    //     $expr: {
    //       $eq: ["$containsName", true]
    //     }
    //   });
    // }


    if (query.date) {
      match.$match.$and.push({
        $expr: {
          $lte: ["$startdate", new Date(query.date)]
        }
      });
    }

    if (query.date) {
      match.$match.$and.push({
        $expr: {
          $gte: ["$enddate", new Date(query.date)]
        }
      });
    }
    
    if(query.buyerid){
      match.$match.$and.push({
        $expr: {
          $eq: ["$buyerid", new ObjectId(query.buyerid)]
        }
      });
    }

    if(query.ownerid){
      match.$match.$and.push({
        $expr: {
          $eq: ["$ownerid", new ObjectId(query.ownerid)]
        }
      });
    }

    if (match.$match.$and.length > 0) {
      aggregateContent.push(match);
    }
    // let sortParam = query.sortorder;
    // let sortValue = 1;
    // if (sortParam.includes("_desc")) {
    //   sortParam = sortParam.split("_")[0];
    //   sortValue = -1;
    // }
    aggregateContent.push({
      $sort: {
        ["startdate"]: 1
      }
    });
    // console.log("-------")
    // console.log(JSON.stringify(aggregateContent));
    // console.log("-------")
    let res = await collection.aggregate(aggregateContent).toArray();
    console.log(res);
    return res;
  } catch (err) { 
    console.log("failed to fetch by query");
    console.log(err);
  }
  finally {
    client.close();
  }
}