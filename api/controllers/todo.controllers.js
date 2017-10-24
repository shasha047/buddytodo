var mongoose = require('mongoose');
var user     = mongoose.model('user');
var list     = mongoose.model('list');

module.exports.createlist = function(req,res){
    console.log("creating a new list");

    var list_name = req.body.list_name;
    var buddy_email = req.body.buddy_email;
    var creator_email = req.body.creator_email;

    user
    .findOne({email:buddy_email})
    .select('buddy_list')
    .exec((err,udoc)=>{
        if(err){
            return res.status(400).json("ERR occured in the system");
        }
        else if(!udoc){
            return res.status(500).json("buddy not available on the system");
        }
        else{

            list
            .findOne({name:list_name,creator_email:creator_email,buddy_email:buddy_email})
            .exec((err,ldoc)=>{
                if(err){

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
                            return res.status(400).json("ERR occured in the system");
                        }
                        else{
                            
                            udoc.buddy_list.push(savedlist._id);
                            udoc.save();

                            user
                            .findOne({email:creator_email})
                            .select('creator_list')
                            .exec((err,cudoc)=>{
                                if(err){
                                    return res.status(400).json("ERR occured in the system");
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
    .findOne({name:name,creator_email:creator_email,buddy_email:buddy_email})
    .exec((err,ldoc)=>{
        if(err){

        }
        else if(!ldoc){
            return res.status(400).json("no list available");
        }
        else{
            ldoc.tasks[req.body.task_index].status="completed";
            ldoc.save();

            return res.status(200).json("task status updated successfully");
        }
    })
};

module.exports.createdtasks = function(req,res){
    list
    .find({creator_email:req.body.creator_email})
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


module.exports.buddytasks = function(req,res){
    list
    .find({buddy_email:buddy_email,"tasks.status"==="pending"})
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

