const express = require('express')
const cors = require('cors')
const path = require('path');
const dbm=require('./db')
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dbm.connect()
require('dotenv').config()

app.get('/api/user',function (req,res){
    console.log(req.query);
    dbm.getIdUser(req.query.username,req.query.password).then((result)=>{
        res.send(result)
    })
});

app.get('/api/getalldata',function (req,res){
    dbm.getAllData().then((result)=>{
        res.send(result)
    })
});

app.get('/api/getgereja',function (req,res){
  dbm.getAllGereja().then((result)=>{
      res.send(result)
  })
});

app.get('/api/getuser',function (req,res){
    dbm.getAllUser().then((result)=>{
        res.send(result)
    })
});

app.get('/api/getimam',function (req,res){
  dbm.getAllImam().then((result)=>{
      res.send(result)
  })
});

app.get('/api/getidgereja',function (req,res){
    dbm.getIdGereja(req.query.id).then((result)=>{
        res.send(result)
    })
});

app.get('/api/getuseremail',function (req,res){
  dbm.getUserEmail(req.query.email).then((result)=>{
      res.send(result)
  })
});

app.patch('/api/updategereja',function(req,res){
   dbm.updateGereja(req.body.data)
  })

  app.patch('/api/updatepassword',function(req,res){
    dbm.updatePassword(req.body.data).then((result)=>{
      res.send(result)
  })
   })

  app.patch('/api/banneduser',function(req,res){
    dbm.bannedUser(req.body.data)
   })

  app.post('/api/addgereja',function(req,res){
    dbm.addGereja(req)
  })

  app.post('/api/addimam',function(req,res){
    dbm.addImam(req)
  })

  app.delete('/api/deletegereja',function(req,res){
   dbm.deletegereja(req.body.id)
 })
 app.delete('/api/deleteuser',function(req,res){
    dbm.deleteUser(req.body.id)
  })

  if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
        
    });
  }
  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

