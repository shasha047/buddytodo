// require('./api/data/db.js');
var express = require('express');
// var bodyparser = require('body-parser');
// var path = require('path');
var app = express();
// var routes = require('./api/routes');


// app.use(express.static(path.join(__dirname,'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// app.use(bodyparser.urlencoded({ extended : false }));
// app.use(bodyparser.json());



// app.use('/api',routes);


app.listen(3000,function(){
    console.log("TripOverflow running on port 3000!");
});