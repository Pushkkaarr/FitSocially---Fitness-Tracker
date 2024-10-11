import mongoose from 'mongoose';

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique : true
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
    gym_joined:{
        type:String,
        required:true
    },
    userBio:{
        type:String,
        default:"Hey ! There I am using FitSocially"
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
    targetCalories:{
        type:Number,
        
    }
},
{timestamps:true
});

const User = mongoose.model('User',userSchema);
//module.exports = mongoose.model('User',userSchema);

export default User;