import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    text:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        default:""
    },
    videoUrl:{
        type:String,
        default:""
    },
    seen:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const chatSchema = mongoose.Schema({
   sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
   },
   recevier_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
   },
   message:[
    {
        type:mongoose.Schema.ObjectId,
        ref:'Message'
    }
   ]
},

{timestamps:true
});

module.exports = mongoose.Model('Message',messageSchema);
module.exports = mongoose.Model('Chat',chatSchema);