const express = require('express');
const dotenv = require('dotenv');
const bodyparser=require('body-parser');
const path = require('path');
const connectDB =require('./server/database/connection');
const app = express();

dotenv.config({path : 'config.env'});
const port = process.env.port || 8080;

//mongoDB connection
connectDB();

//parse request to bodyparser
app.use(bodyparser.urlencoded({extended : true}))

//set view engine
app.set("view engine","ejs");
//app.set("views",path.resolve(__dirname,"views/ejs"))


//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
// css/style.css
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));


app.use('/',require('./server/routes/router'));
/*app.use('/add-user',require('./server/routes/router'))
app.use('/update-user',require('./server/routes/router'))*/


app.listen(port,()=>{console.log(`server running on ${port}`)});