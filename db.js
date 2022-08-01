require('dotenv').config()
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

var stringcon=`mongodb+srv://${process.env.USERNAME_DB}:${process.env.PW_DB}@cluster0.hw29l.mongodb.net/GerejaDB`
const conn = mongoose.createConnection(stringcon);
const connect = async (e)=>{ 
await mongoose.connect(stringcon,{
    useNewUrlParser: true, 
    useUnifiedTopology: true

 }).then(()=>{
     console.log("Database Connect")
 }).catch(err=>{
     console.log("Database Failed to Connect "+err)
 })
}

const adminscheme = new Schema({
    password: String,
    user: String
  
   },{collection:'admin'});
var admin=mongoose.model('admin',adminscheme)

const gerejascheme = new Schema({
    nama:String,
    address:String,
    kapasitas:String,
    paroki:String,
    lingkungan:String
   },{collection:'Gereja'});
var gereja=mongoose.model('Gereja',gerejascheme)

const userscheme = new Schema({
    name:String,
    email:String,
    password:String,
    picture:String,
    },{collection:'user'});
var user=mongoose.model('user',userscheme)



async function getAllGereja(){
    var arr=[]
     await gereja.find().then((res)=>{
        arr=res;
    }).catch((e)=>{
        console.log(e)
    })
    return arr
}

async function getAllUser(){
    var arr=[]
     await user.find().then((res)=>{
        arr=res;
    }).catch((e)=>{
        console.log(e)
    })
    return arr
}


async function getIdUser(id,pw){
    var arr=[]
    console.log(id);
     await admin.find({
        $and: [
            {user: id},
             {password: pw} 
        ]
    }).then((res)=>{
        arr=res;
        console.log(res)
    }).catch((e)=>{
        console.log(e)
    })
    return arr
}

async function getIdGereja(id){
    var arr=[]
    console.log(id);
     await gereja.findById(id).then((res)=>{
        arr=res;
        console.log(res)
    }).catch((e)=>{
        console.log(e)
    })
    return arr
}

async function updateGereja(item){
    await gereja.updateOne(
        { _id: item.id },
        { $set: { nama: item.nama ,address: item.address,kapasitas: item.kapasitas,paroki: item.paroki,lingkungan: item.lingkungan} },
        { upsert: true } // Make this update into an upsert
      );
}

function addGereja(item){
    const newData = {
        nama:item.body.nama,
        address:item.body.address,
        kapasitas:item.body.kapasitas,
        paroki:item.body.paroki,
        lingkungan:item.body.lingkungan
    }
    var data= new gereja(newData);
    data.save();
}
function deletegereja(item){
    gereja.findByIdAndRemove(item).exec();
   }
module.exports={
connect:connect,
getIdUser:getIdUser,
getAllGereja:getAllGereja,
getAllUser:getAllUser,
getIdGereja:getIdGereja,
updateGereja:updateGereja,
addGereja:addGereja,
deletegereja:deletegereja

}