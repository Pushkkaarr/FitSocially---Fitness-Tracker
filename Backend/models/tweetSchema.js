import mongoose from 'mongoose';

const { Schema } = mongoose;

const tweetSchema = new Schema({
  description: {
    type: String,
    required: true,
    maxlength: 280, // Assuming a maximum length similar to Twitter
  },
  image: {
    type: String, // This will store the image URL or file path
    required: false
},
  likes: {
    type: [Schema.Types.ObjectId],  // Ensure it's an array of ObjectIds
    default: [],
  },
 
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userDetails:{
    type:Array,
    default:[]
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet; // Export Tweet as default
