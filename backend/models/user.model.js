const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstname:String,
    lastname: String,
    email: String,
    password: String,
    phone:String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    apartments:[],
    reservations:[],
  })
);
module.exports = User;