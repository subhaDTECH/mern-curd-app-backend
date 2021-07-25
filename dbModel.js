const mongoose= require("mongoose")
const vacinationSechema=mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    aadhar:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String
    }
},{timestamps:true})
// eJE0BiUq2DRBXRv2
// 
module.exports=mongoose.model('vacinationLists',vacinationSechema);