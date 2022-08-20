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
    if (updates._id) {
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

exports.getApartmentsByQuery = async function (table, query) {
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

    if (query.startdate && query.enddate) {
      aggregateContent.push(
        {
          $lookup: {
            from: "reservations",
            localField: "_id",
            foreignField: "apartmentid",
            as: "reservations",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $or: [
                      { $lt: [new Date(query.startdate), "$startdate"] },
                      { $gt: [new Date(query.enddate), "$enddate"] }
                    ]
                  }
                }
              }
            ]
          }
        });
      aggregateContent.push(
        {
          $addFields: {
            isAvailable: {
              $lt: [{ $size: "$reservations" }, 1]
            }
          }
        });
      aggregateContent.push(
        {
          $unset: "reservations"
        });
      aggregateContent.push(
        {
          $match: {
            $expr: {
              $eq: ["$isAvailable", true]
            }
          }
        });
    }

    aggregateContent.push(
      {
        $lookup: {
          from: "reservations",
          localField: "_id",
          foreignField: "apartmentid",
          as: "reservations_rating"
        }
      });
    aggregateContent.push(
      {
        $addFields: {
          "rating": {
            $cond: {
              if: {
                $eq: [{ $avg: "$reservations_rating.rating" }, null]
              },
              then: 0,
              else: { $avg: "$reservations_rating.rating" }
            }
          }
        }
      }
    );
    
    if (query.city) {
      aggregateContent.push({ $addFields: { containsCity: { $regexMatch: { input: "$city", regex: new RegExp(query.city, "i") } } } });
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
          $gte: ["$maxvisitors", query.minvisitors]
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

exports.getReserationsByQuery = async function (table, query) {
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
    return;
  }

  try {
    const db = client.db('tables');
    let collection = db.collection(table);
    let match = {
      $match: {
        $expr: {
          $and: [
          ]
        }
      }
    };
    let aggregateContent = [
      {
        $lookup: {
          from: "apartments",
          localField: "apartmentid",
          foreignField: "_id",
          as: "apartment"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "ownerid",
          foreignField: "_id",
          as: "owner"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "buyerid",
          foreignField: "_id",
          as: "customer"
        }
      },
      {
        $addFields: {
          "apartment": {
            $first: "$apartment"
          },
          "owner": {
            $first: "$owner"
          },
          "customer": {
            $first: "$customer"
          }
        }
      },
      {
        $unset: ["customer.password", "customer.roles", "owner.password", "owner.roles"]
      }
    ];

    if (query.startdate) {
      match.$match.$expr.$and.push({
        $gte: [new Date(query.startdate), "$startdate"]
      });
      match.$match.$expr.$and.push({
        $lte: [new Date(query.startdate), "$enddate"]
      });
    }

    if (query.buyerid) {
      match.$match.$expr.$and.push({
        $eq: ["$buyerid", new ObjectId(query.buyerid)]
      });
    }

    if (query.ownerid) {
      match.$match.$expr.$and.push({
        $eq: ["$ownerid", new ObjectId(query.ownerid)]
      });
    }

    if (query.city) {
      aggregateContent.push({ $addFields: { containsCity: { $regexMatch: { input: "$apartment.city", regex: new RegExp(query.city, "i") } } } });
      match.$match.$expr.$and.push(
        {
          $eq: ["$containsCity", true]
        });
    }

    if (query.apartmentName) {
      aggregateContent.push({ $addFields: { containsApartmentName: { $regexMatch: { input: "$apartment.name", regex: new RegExp(query.apartmentName, "i") } } } });
      match.$match.$expr.$and.push(
        {
          $eq: ["$containsApartmentName", true]
        });
    }
    aggregateContent.push(match);
    return await collection.aggregate(aggregateContent).toArray();
  } catch (err) {
    console.log("failed to fetch by query");
    console.log(err);
  } finally {
    client.close();
  }
}


//this function returns the total price of the reservation times the day diffrence from startdate to enddate for a given user
exports.getTotalSpendings = async function (table, id) {

  if(false)//MongoDB Server: Map-Reduce is not supported for free tier at this time.
  {
    const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

    if (!client) {
      return;
    }
  
    try {
      const db = client.db('tables');
      let collection = db.collection(table);
      let map = function () {
        emit(this.buyerid, {
          total: this.price * (this.enddate - this.startdate) / (1000 * 60 * 60 * 24)
        });
      }
      let reduce = function (key, values) {
        let total = 0;
        for (let i = 0; i < values.length; i++) {
          total += values[i].total;
        }
        return {
          total: total
        };
      }
      
      let result = await collection.mapReduce(map, reduce, {
        query: {
          buyerid: new ObjectId(id)
        }
      });
      return result;
    } catch (err) {
      console.log("failed to fetch by query");
      console.log(err);
    } finally {
      client.close();
    }
  }
  
  const client = await MongoClient.connect(uri).catch(err => { console.log(err); });

  if (!client) {
    return;
  }

  try {
    const db = client.db('tables');
    let collection = db.collection(table);
    let match = {
      $match: {
        $expr: {
          $and: [
            {
              $eq: ["$buyerid", new ObjectId(id)]
            }
          ]
        }
      }
    };
    let aggregateContent = [
      match,
      {
        $lookup: {
          from: "apartments",
          localField: "apartmentid",
          foreignField: "_id",
          as: "apartment"
        }
      },
      {
        $addFields: {
          "apartment": {
            $first: "$apartment"
          }
        }
      }
    ];
    let result = await collection.aggregate(aggregateContent).toArray();
    result = result.map((res) => {return {"price":res.apartment.price, "startdate":new Date(res.startdate),"enddate":new Date(res.enddate)}});
    result = result.reduce(function (result,mapped_res){return result + (mapped_res.price * ((mapped_res.enddate - mapped_res.startdate) / (1000 * 60 * 60 * 24))) },0);
    return {"result":result};
  } catch (err) {
    console.log("failed to fetch by query");
    console.log(err);
  } finally {
    client.close();
  }
}