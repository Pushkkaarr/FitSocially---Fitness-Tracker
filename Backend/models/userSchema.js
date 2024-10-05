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
    online:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        required:true,
        unique :true
    },
    age:{
        type:Number,
        //required:true
    },
    contact:{
        type:Number,
       // required:true
    },
    weight:{
        type:Number,
        //required:true
    },
    BMI:{ //body mass index
        type:Number,
        //required:true
    },
    height:{
        type:Number,
       // required:true
    },
    profile_pic :{
        type:String, //url to the image
        default:""
    },
    followers: {
        type: Array,
        default: [],
      },
      following: {
        type: Array,
        default: [],
      },
},
{timestamps:true
});

const User = mongoose.model('User',userSchema);
//module.exports = mongoose.model('User',userSchema);

export default User;