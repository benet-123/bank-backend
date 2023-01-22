//import JWT ie is installed
const jwt=require('jsonwebtoken')

//importb db
const db=require('./db')

userdetails={
    1000: { acno: 1000, username: "Benet", password: 123, balance: 0,transaction:[]},
    1001: { acno: 1001, username: "Arjun", password: 456, balance: 0,transaction:[] },
    1002: { acno: 1002, username: "Benny", password: 789, balance: 0,transaction:[] },
    1003: { acno: 1003, username: "Shiva", password: 111, balance: 0,transaction:[] }, 
  }

  const register=(acno, username, password)=> {
    return db.User.findOne({acno}) //data is selected using findone
    .then(user=>{
      if(user){
        return {
          status:"false",
          statusCode:400,
          message:"user already registered"
  
        }
      }
      else{
        const newUser=new db.User({
          acno:acno,
          username:username,
          password:password,
          balance:0,
          transaction:[]
        })
        newUser.save()//data is stored in mongodb
        return {
          status:"true",
          statusCode:200,
  
          message:"Successfully registered"
        }
      }
    }
    )
  }
   
  


  const login=(acno,psw)=>{
  
    return db.User.findOne({acno,psw}) //data is selected using findone
    .then(user=>{
      if(user){
        currentuser=user.username
        currentacno=acno
        const token= jwt.sign({currentacno:acno},'superKey2022')
        return {
          status:"true",
          statusCode:200,
     message:"Successfully login",
     token:token
        }
    

      }
      else{
        return {
          status:"false",
          statusCode:400,
          message:"invalid userdetails"
  
        }

      }
    })
  }


   deposit=(acno,psw,amnt)=>{
    //to convert amount datatype from string to int
    var amount=parseInt(amnt)
    return db.User.findOne({acno,psw})  
    .then(user=>{
      if(user){
        user.balance+=amount
        user.transaction.push({
          type:'Credit',
          Amount:amount
        })
        user.save()
        return {
          status:"true",
          statusCode:200,
    
          message:`${amount} is successfuly credited and available balance is ${user.balance}`
        }     
       }
       else{
        return {
          status:"false",
          statusCode:400,
          message:"incorrect user"
      
        }
       }
    })


 }
   
 



   withdraw=(acno,psw,amnt)=>{
    var amount=parseInt(amnt)
    return db.User.findOne({acno,psw})
    .then(user=>{
      if(user){
        if(user.balance>amount){
          user.balance-=amount
          user.transaction.push({
            type:'Debit',
            Amount:amount
          })
          user.save()
          return {
            status:"true",
            statusCode:200,
      
            message:`${amount} is successfuly debited and available balance is ${user.balance}`
          }
      
        }
      }
      else{
        return {
          status:"false",
          statusCode:400,
          message:"invalid userdetails"
      
        }
      }

    })
  }  
      
  const getTransaction=(acno)=>{
    return db.User.findOne({acno})
    .then(user=>{
      if(user){
        return {
          status:"true",
          statusCode:200,
         transaction:user.transaction
    
        }
    
      }
      else{
        return {
          status:"false",
          statusCode:200,
          message:"user not found"
    
        }
    
      }
    })
    }
    
      

  module.exports={
    //give the function names required to export
    register,login,deposit,withdraw,getTransaction
  }
