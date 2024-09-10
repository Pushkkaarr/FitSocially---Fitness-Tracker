import mongoose from 'mongoose';

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_Online:{
        type:String,
        default:'0'
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
},
{timestamps:true
});

module.exports = mongoose.Model('User',userSchema);