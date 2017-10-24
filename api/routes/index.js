var express = require('express');
var router = express.Router();


var ctrlUsers = require('../controllers/users.controllers.js');




router
  .route('/users/register')
  .post(ctrlUsers.register);

  router
    .route('/users/login')
    .post(ctrlUsers.login);

module.exports = router;