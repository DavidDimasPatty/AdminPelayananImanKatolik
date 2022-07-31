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


// async function getAllCategory(){
//     var arr=[]
//      await category.find().then((res)=>{
//         arr=res;
//     }).catch((e)=>{
//         console.log(e)
//     })
//     return arr
// }


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

// async function getScore(){
//     var arr=[]
//      await score.find().then((res)=>{
//         arr=res;
//     }).catch((e)=>{
//         console.log(e)
//     })
//     return arr
// }

// async function getCategory(){
//     var arr=[]
//      await category.find().then((res)=>{
//         arr=res;
//     }).catch((e)=>{
//         console.log(e)
//     })
//     return arr
// }

// function addQuiz(item){
//     console.log(item.body)
//     const newData = {
//         soal: item.body.question,
//         option1: item.body.option1,
//         option2: item.body.option2,
//         option3: item.body.option3, 
//         option4: item.body.option4,
//         jawaban :item.body.answer,
//         category: item.body.category
//     }
//     var data= new quiz(newData);
//     data.save();
// }

// function addScore(item){
//     console.log(item.body)
//     const newData = {
//         name : item.body.name,
//         score: item.body.score,
//         timeTaken: item.body.time,
//         time: item.body.time,
//         category: item.body.category
    
//     }
//     var data= new score(newData);
//     data.save();
// }


// function deleteQuiz(item){
//  quiz.findByIdAndRemove(item).exec();
// }

// async function getOneQuiz(item){
//     var arr=[]
//     await quiz.findById(item).then((res)=>{
//        arr=res;
//     }).catch((e)=>{
//        console.log(e)
//    })
//    return arr
// }

// async function getOneQuizCategory(item){
//     var arr=[]
    
//   await  quiz.findOne({
//         $or: [
//             {category: item.idc}, 
//         ]
//     }).skip(item.q).then((res)=>{
//         arr=res;
//         console.log(arr)
//     }).catch((err)=>{
//         console.log(err)
//     })
//     return arr
// }

// async function getScoreUser(item){
//     var arr=[]
    
//   await  score.findOne({
//         $or: [
//             {_id: item.id}, 
//         ]
//     }).then((res)=>{
//         arr=res;
//         console.log(arr)
//     }).catch((err)=>{
//         console.log(err)
//     })
//     return arr
// }

// async function updateQuiz(item){
//     await quiz.updateOne(
//         { _id: item.id },
//         { $set: { soal: item.question ,option1: item.option1,option2: item.option2,option3: item.option3,option4: item.option4, jawaban:item.answer,category:item.category } },
//         { upsert: true } // Make this update into an upsert
//       );
// }

// async function updateScore(item){
//     await score.updateOne(
//         { _id: item.id },
//         { $set: { score: item.score } },
//         { upsert: true } // Make this update into an upsert
//       );
// }


module.exports={
connect:connect,
getIdUser:getIdUser,
getAllGereja:getAllGereja,
getAllUser:getAllUser
}