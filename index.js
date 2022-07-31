const express = require('express')
const cors = require('cors')
const dbm=require('./db')
const db = require('./db')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dbm.connect()

require('dotenv').config()

app.get('/user',function (req,res){
    console.log(req.query);
    dbm.getIdUser(req.query.username,req.query.password).then((result)=>{
        res.send(result)
    })
});

app.get('/getgereja',function (req,res){
    dbm.getAllGereja().then((result)=>{
        res.send(result)
    })
});

app.get('/getuser',function (req,res){
    dbm.getAllUser().then((result)=>{
        res.send(result)
    })
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

