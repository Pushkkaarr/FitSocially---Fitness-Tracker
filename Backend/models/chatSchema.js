import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
},
   recevier_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
   },
   message:{
    type:String,
    required:true
   }
},
{timestamps:true
});

module.exports = mongoose.Model('User',userSchema);