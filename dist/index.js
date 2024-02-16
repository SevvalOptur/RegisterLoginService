"use strict";

var express = require('express');
var cors = require('cors');
var dotenv = require('dotenv');
var _require = require('./config/database.js'),
  readUsersFromFile = _require.readUsersFromFile,
  saveUsersToFile = _require.saveUsersToFile;
var User = require('./routes/user.js');
dotenv.config();
var app = express();
app.use(cors());
app.use(express.json());
app.use('/', User);
app.get('/', function (req, res) {
  res.json({
    message: " deneme"
  });
});
var PORT = process.env.PORT || 5000;
//db();

var users = readUsersFromFile();
console.log(users);
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});