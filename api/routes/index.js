var express = require('express');
var router = express.Router();


var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlTodo = require('../controllers/todo.controllers.js');

router
  .route('/btodo/list')
  .post(ctrlTodo.createlist)

// router
//   .route('/btodo/deletelist')
//   .post(ctrlTodo.deletelist)

router
  .route('/btodo/task')
  .post(ctrlTodo.createtask)

router
  .route('/btodo/task/created/:creator_email')
  .get(ctrlTodo.mycreatedtasks)

router
  .route('/btodo/task/assigned/:buddy_email')
  .get(ctrlTodo.mybuddytasks)
  
router
  .route('/btodo/status')
  .post(ctrlTodo.changestatus)

router
  .route('/users/register')
  .post(ctrlUsers.register);

router
  .route('/users/login')
  .post(ctrlUsers.login);

module.exports = router;