var Userdb = require('../model/model');

//create and save a new user

exports.create = (req,res)=>{
//validate request
if(!req.body){
    res.status(400).send({message : 'Content can not be empty!'})
    return ;
}
   //enw user
   const user = new Userdb({
       name : req.body.name,
       email:req.body.email,
       gender:req.body.gender,
       status:req.body.status
   })

   //save user in the database

   user.save(user).then(data=>{
       //res.send(data);
       res.redirect('/add-user');
   })
   .catch(err=>{
       res.status(500).send({
           message:err.message || "some error occured while creating a create opearation"
       })
   })
}

exports.find = (req,res)=>{
    if(req.query.id){
       const id= req.query.id;
       Userdb.findById(id).then(data=>{
           if(!data){res.status(404).send({message:"user not found"})}
           else{res.send(data)}
        }
       ).catch(err=>{res.status(500).send({message: "Error occured while returning user"})})
    }else{
        Userdb.find().then(user=>{res.send(user)})
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occured while returning data"})
        })
    }
    
}

exports.update = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"data to update can't be empty"});

    }
    const id=req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false}).then(data=>{
    if(!data){res.status(400).send({message:`cannot update user with id ${id} or maybe user doesn't exist`})}
    else {res.send(data);}
 }).catch(err=>{res.status(500).send({message:"Error update User"})
 })
}

exports.delete = (req,res)=>{
    const id=req.params.id;
    Userdb.findByIdAndDelete(id).then(data=>{
    if(!data){res.status(404).send({message : `Cannot delete this user with id ${id} maybe user doesn't exist`})}
    else {
        res.send({message: "user deleted successfully"});
    }
    }).catch(err=>{
        res.status(500).send({message : "Error delete User"})
    })
}