const express =require("express")
const app=express()
const cors=require('cors')
const vacinationLists=require('./dbModel.js')

const mongoose = require("mongoose")
const { response } = require("express")
require('dotenv').config()
const port=process.env.PORT || 5000;


//db
const MONGODB_url=process.env.MONGODB_URL;

mongoose.connect(MONGODB_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("conn success to db")
}).catch((e)=>console.log(e))

//md
app.use(express.json())
app.use(cors())

//route
app.get('/',(req,res)=>{
    res.send("hiii")
})
//add user to database
app.post('/user/add',(req,res)=>{

    const dbData=req.body;
    const {name,email,phone,aadhar,status}=req.body;
    console.log(req.body)

    if(!name ||  !email || !phone|| !aadhar || !status){
        return  res.status(400).json({msg:"All fill required"})
    }
    const Newuser=new vacinationLists(dbData);
    Newuser.save().then((result)=>{
        res.status(201).send(result)
    }).catch((e)=>{
        res.status(400).send(e)
    })

})
//get all user from database
app.get('/user/gets',(req,res)=>{
   vacinationLists.find().then((result)=>{
       if(result){
           return res.status(200).send(result)
       }
   }).catch((e)=>{
       return res.status(400).send("user Not found")
   })

})
//get one user by Id
app.get('/user/get/:id',(req,res)=>{
    const userId=req.params.id;
    vacinationLists.findOne({_id:userId}).then((result)=>{
        if(result){
            return res.status(200).send(result)
        }
    }).catch((e)=>{
        return res.status(400).send("User not find")
    })
})
//update User bi Id
app.patch('/user/update/:id',(req,res)=>{
    const userId=req.params.id;
    vacinationLists.findByIdAndUpdate({_id:userId},{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        aadhar:req.body.aadhar,
        status:req.body.status,
    },{new:true}).then((result)=>{
        console.log(result)
        return res.status(200).send(result)
    }).catch((e)=>{
        console.log(e)
        return res.status(400).json({msg:"Error accured"})
    })
})
//delete one user by id
app.delete('/user/delete/:id',(req,res)=>{
   const userId=req.params.id;
   vacinationLists.findByIdAndDelete({_id:userId})
   .then((result)=>{
       return res.status(200).send("User Delete successfully !!!")
   }).catch((e)=>{
       return res.status(400).send(e)
   })

})


//app listen on port
app.listen(port,()=>{
    console.log(`server run on port ${port}`)
})
