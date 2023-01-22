//server creation

//1 import the port that is alreday expoted in node modules

const express= require('express')

//import dataservice
const dataservices=require('./services/data.service')

//import cors
const cors=require('cors')


//import jwt
const jwt=require('jsonwebtoken')

// 2 create an application using the express

const app = express()

// to parse json from request body,

app.use(express.json()) //type conversion


//give command to share data via cors  //to connect the frontend
app.use(cors({
  origin:'http://localhost:4200'
}))


//Apllication specific middleware
const applicationMiddleware=(req,res,next)=>{  //created a arrow function applicationmiddleware
  console.log('Application Middleware');
 next()
}
app.use(applicationMiddleware)  //use is the method to use the function


//router specific middleware

const jwtmiddleware=(req,res,next)=>{
   try{
    console.log('Router specific middlware');
   const token=req.headers['x-access-token']
   const data=jwt.verify(token,'superKey2022')
   console.log(data);
   next()
  } 
  catch{
    res.status(422).json({
      statusCode:422,
      status:false,
      message:'please login first'
    })
  }
}



//3 create a port number (for backend)

app.listen(3000,()=>{
    console.log('listening to port 3000');
})

//4 Resolving HTTP request
//get,post,put,patch,delete

//resolving get requset

// app.get('/',(req,res)=>{
//     res.send('Get Request')
// })


// //resolving post reqiests

// app.post('/',(req,res)=>{
//     res.send('post request')
// })

// //resolving put reqiests

// app.put('/',(req,res)=>{
//     res.send('put  request')
// })
// //resolving patch reqiests


// app.patch('/',(req,res)=>{
//     res.send('patch request')
// })

// //resolving delete reqiests

// app.delete('/',(req,res)=>{
//     res.send('delete request')
// })

// API requests
// 1 registration requests
app.post('/register',(req,res)=>{
    console.log(req.body);
dataservices.register(req.body.acno,req.body.username,req.body.password) 
  .then(result=>{
    res.status(result.statusCode).json(result)

  }) //to bring the register in dataservice function in index.js
})

// 2 login requests
app.post('/login',(req,res)=>{
  console.log(req.body);
dataservices.login(req.body.acno,req.body.password)
.then(result=>{
  res.status(result.statusCode).json(result)

})
})


// 3 deposit requests

app.post('/deposit',jwtmiddleware,(req,res)=>{
  console.log(req.body);
dataservices.deposit(req.body.acno,req.body.password,req.body.amount)
.then(result=>{
  res.status(result.statusCode).json(result)

})
})



// 4 withdraw requests
app.post('/withdraw',jwtmiddleware,(req,res)=>{
  console.log(req.body);
dataservices.withdraw(req.body.acno,req.body.password,req.body.amount)
.then(result=>{
  res.status(result.statusCode).json(result)

})
})

// 5 transaction requests
app.post('/transaction',jwtmiddleware,(req,res)=>{
  console.log(req.body);
dataservices.getTransaction(req.body.acno)
.then(result=>{
  res.status(result.statusCode).json(result)

})


})

// 6 delete requests

