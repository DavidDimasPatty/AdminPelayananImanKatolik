const express = require('express')
const cors = require('cors')
const path = require('path');
const dbm=require('./db')
const db = require('./db')
const bodyParser = require("body-parser");
const { Router } = require('express');
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

app.get('/getidgereja',function (req,res){
    dbm.getIdGereja(req.query.id).then((result)=>{
        res.send(result)
    })
});

app.patch('/updategereja',function(req,res){
   dbm.updateGereja(req.body.data)
  })

  app.patch('/banneduser',function(req,res){
    dbm.bannedUser(req.body.data)
   })

  app.post('/addgereja',function(req,res){
    dbm.addGereja(req)
  })

  app.delete('/deletegereja',function(req,res){
   dbm.deletegereja(req.body.id)
 })
 app.delete('/deleteuser',function(req,res){
    dbm.deleteUser(req.body.id)
  })

  if(process.env.NODE_ENV === 'production') {
    app.use('/api', Router.call('./db.js')) 
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
        
    });
  }
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

