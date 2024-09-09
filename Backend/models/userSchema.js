const mongoose = require('mongoose')

mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    BMI:{ //body mass index
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
})