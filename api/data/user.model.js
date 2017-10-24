var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  creator_list:[{
    type:mongoose.Schema.Types.ObjectId
  }],
  buddy_list:[{
    type:mongoose.Schema.Types.ObjectId
  }]
});

mongoose.model('user', userSchema);
