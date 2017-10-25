var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// var autoIncrement = require('mongoose-auto-increment');

var listSchema = new mongoose.Schema({
  name:{
      type:String
  },
  creator_email:{
      type:String
  },
  buddy_email:{
      type:String
  },
  tasks:[{
    //   task_index:{
    //      type:Number
    //   },
      content:{
          type:String
      },
      status:{
          type:String
      }
  }],
  timestamp:{
      type:Date,
      default:Date.now
  }
});

// listSchema.plugin(autoIncrement.plugin, { model: 'list', field: 'tasks.task_index',startAt: 0, incrementBy: 1 });

mongoose.model('list', listSchema);
