//server -mongodb integartion
//1)import mongoose once the thing is installed we have to import to use
const mongoose=require('mongoose')

// 2) conncet the mongose to mongodb

mongoose.connect('mongodb://localhost:27017/Bankserver',{
    useNewUrlParser:true //to avoid unwanted warnings
})

//define bank db model
const User=mongoose.model('User',
{
    //schema creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})
//export collection 
module.exports={
    User
}