var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var user     = mongoose.model('user');
var list     = mongoose.model('list');

module.exports.createlist = function(req,res){
    console.log("creating a new list");

    var list_name = req.body.list_name;
    var buddy_email = req.body.buddy_email;
    var creator_email = req.body.creator_email;

    console.log("list_name",list_name);
    console.log("buddy_email",buddy_email);
    console.log("creator_email",creator_email);

    user
    .findOne({email:buddy_email})
    .select('buddy_list')
    .exec((err,udoc)=>{
        if(err){
            console.log("1 ",err);
            return res.status(400).json(err);
        }
        else if(!udoc){
            return res.status(500).json("buddy not available on the system");
        }
        else{

            list
            .findOne({name:list_name,creator_email:creator_email,buddy_email:buddy_email})
            .exec((err,ldoc)=>{
                if(err){
                    console.log("2 ",err);
                }
                else if(ldoc){
                    return res.status(409).json("This combination of list already exists.");
                }
                else{
                    var new_list = new list();

                    new_list.name = list_name;
                    new_list.creator_email = creator_email;
                    new_list.buddy_email = buddy_email;

                    new_list.save((err,savedlist)=>{
                        if(err){
                            console.log("3 ",err);
                            return res.status(400).json(err);
                        }
                        else{
                            
                            udoc.buddy_list.push(savedlist._id);
                            udoc.save();

                            user
                            .findOne({email:creator_email})
                            .select('creator_list')
                            .exec((err,cudoc)=>{
                                if(err){
                                    console.log("4 ",err);
                                    return res.status(400).json(err);
                                }
                                else{
                                    cudoc.creator_list.push(savedlist._id);
                                    cudoc.save();

                                    return res.status(200).json("list created successfully");        
                                }
                            })
                        }
                    })
                }
            })
            
        }
    })
};

module.exports.createtask = function(req,res){
    console.log("posting task to the list");

    var name = req.body.name;
    var creator_email = req.body.creator_email;
    var buddy_email = req.body.buddy_email;
    var loggedin_email = req.body.loggedin_email;

    list
    .findOne({name:name,creator_email:creator_email,buddy_email:buddy_email})
    .exec((err,ldoc)=>{
        if(err){

        }
        else if(!ldoc){
            return res.status(500).json("this combination of list not exists");
        }
        else{
            if(loggedin_email===creator_email){
                var task = {
                    content:req.body.content,
                    status:"pending"
                }
                ldoc.tasks.push(task);
                ldoc.save();

                return res.status(200).json("new task added successfully in the list");

            }
            else{
                return res.status(400).json("only creator can assign a task");
            }
        }
    })


};

module.exports.changestatus = function(req,res){
    var name = req.body.name;
    var creator_email = req.body.creator_email;
    var buddy_email = req.body.buddy_email;

    list
    .findOneAndUpdate(
        {name:name,creator_email:creator_email,buddy_email:buddy_email,"tasks._id":req.body.task_id},
        {$set:{"tasks.$.status":"completed"}},
        ((err,ldoc)=>{
        if(err){

        }
        else if(!ldoc){
            return res.status(400).json("no list available");
        }
        else{
            return res.status(200).json("task status updated successfully");
        }
    })
    )
};

module.exports.mycreatedtasks = function(req,res){
    list
    .find({creator_email:req.params.creator_email})
    .exec((err,ldoc)=>{
        if(err){

        }
        else if(ldoc.length>0){
            return res.status(200).json(ldoc)
        }
        else{
            return res.status(400).json("no lists created by user")
        }
    })
};


module.exports.mybuddytasks = function(req,res){

    list
    .find({buddy_email:req.params.buddy_email})
    .exec((err,ldoc)=>{
        if(err){
            return res.status(400).json("ERR occured in the system")
        }
        else if(ldoc.length>0){
            
            // var fldoc=[];

            // ldoc.map((item,index)=>{
            //     item.tasks.map((itm,idx)=>{
            //         if(itm.status=="pending"){
            //             fldoc.push(item)
            //         }
            //     })
            // })

            return res.status(200).json(ldoc)
        }
        else{
            return res.status(400).json("no lists created by user")
        }
    })
};

