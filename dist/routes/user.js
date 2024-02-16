"use strict";

var express = require('express');
var _require = require('../controllers/user.js'),
  register = _require.register,
  login = _require.login;
var router = express.Router();
router.post('/register', register);
router.post('/login', login);
module.exports = router;