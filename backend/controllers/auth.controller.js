const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const usersService = require('../services/users.service');



const signup = async (req, res) => {
  console.log(req.body.firstname);
  const user = new User({
    firstname:req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phone:req.body.phone,
    apartments:[],
    reservations:[]
  });
  user.save((err, user) => {
    if (err) {
      console.log(err)
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            console.log("err0");
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              console.log("err1");
              res.status(500).send({ message: err });
              return;
            }
            console.log("User was registered successfully!");
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          console.log("err1");

          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            console.log("err2");
            res.status(500).send({ message: err });
            return;
          }
          console.log("User was registered successfully!");
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

const login = async (req, res) => {
  console.log('login');
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        console.log('user failed to login 0')
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        console.log('user failed to login - user was not found')

        return res.status(404).send({ message: "User Not found." });
      }
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        console.log('user failed to login - Invalid Password!')
        return res.status(401).send({ message: "Invalid Password!" });
      }
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      let authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      req.session.token = token;
      console.log('user login succussfully')
      res.status(200).send({
        accessToken:token,
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone:user.phone,
        roles: authorities,
        apartments: user.apartments,
        reservations: user.reservations
      });
    });
};
const logout = async (req, res) => {
  console.log('signuout')
  try {
    req.session = null;
    console.log('logout succussfully!')
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    console.log('failed to logout!')

    this.next(err);
  }
};

const getUsersList = async (req,res)=>{
  console.log("auth getAllUsers");
  result = await usersService.getAllUsers();
  //console.log(result);
  console.log("end auth getAllUsers");
  res.status(200).send(result);
}
module.exports = {
  signup,
  login,
  logout,
  getUsersList
};