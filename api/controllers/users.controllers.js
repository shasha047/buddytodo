var mongoose = require('mongoose');
var user     = mongoose.model('user');
var bcrypt   = require('bcrypt-nodejs');
var jwt      = require('jsonwebtoken');

module.exports.register = function(req, res) {
  console.log('registering user');

  var email = req.body.email;
  var name = req.body.name || null;
  var password = req.body.password;

  
  var new_user = new user();
      new_user.email = email;
      new_user.name = name;
      new_user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      new_user.save((err,saveduser)=>{
        if(err){
          // console.log(err);
          
          if(err.code==11000){
            return res.status(409).json({
              "message":"this email id already exists"
            })
          }
          else{
            res.status(400).json({
              "message":"some error occured"
            });
          }
        }
        else{
          console.log('user created', user);
          res.status(200).json({
            "message":user
          });
        }
      })
  
};

module.exports.login = function(req, res) {
  console.log('logging in user');
  var email = req.body.email;
  var password = req.body.password;

  user.findOne({
    email: email
  }).exec(function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    }
    else if(!user){
      res.status(400).json('user not found');
    } 
    else {
      if (bcrypt.compareSync(password, user.password)) {
        console.log('User found', user);
        var token = jwt.sign({ email: user.email }, 's3cr3t', { expiresIn: 3600 });
        res.status(200).json({success: true, token: token});
      } else {
        res.status(401).json('Unauthorized');
      }
    }
  });
};

module.exports.authenticate = function(req, res, next) {
  var headerExists = req.headers.authorization;
  if (headerExists) {
    var token = req.headers.authorization.split(' ')[1]; //--> Authorization Bearer xxx
    jwt.verify(token, 's3cr3t', function(error, decoded) {
      if (error) {
        console.log(error);
        res.status(401).json('Unauthorized');
      } else {
        req.user = decoded.email;
        next();
      }
    });
  } else {
    res.status(403).json('No token provided');
  }
};
