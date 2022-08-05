const express = require('express');
const cors = require('cors');
const cookieSession = require("cookie-session");
const app = express().use(express.urlencoded({ extended: true }))
.use(express.json());
const router = require('./routes');
app.use(cors());
app.use(
  cookieSession({
    name: "groundbnb2.0",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);
const db = require("./models");
const Role = db.role;
db.mongoose
  .connect('mongodb+srv://admin:1q2w3e@cluster0.hd0gejt.mongodb.net/tables?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
  function initial() {
    console.log('initiate DB with roles');
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
    console.log('done initiating');
  }
app.use('/',router);

app.use('/hello', function(req, res) {
    res.send('Hello World!')
  });


module.exports = app;