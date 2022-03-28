const axios = require('axios');



exports.homeRoute=(req,res)=>{
    axios.get("http://localhost:3000/api/users").then(function(response){
        res.render("index",{users:response.data});
    }).catch(err=>res.send(err));
    }

    exports.addUserRoute=(req,res)=>{
        //res.send("crud-app");
        res.render("add_user");
    }

    exports.updateUserRoute=(req,res)=>{
        axios.get("http://localhost:3000/api/users",{params:{id:req.query.id}})
        .then(function(userData){
            res.render("update_user",{user:userData.data});

        }).catch(err=>{res.send(err)});
    }