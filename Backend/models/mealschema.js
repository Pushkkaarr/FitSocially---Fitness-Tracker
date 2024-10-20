import mongoose from 'mongoose';

const { Schema } = mongoose;

// Create schema for meal tracking
const mealSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],  // Possible values for meal type
    required: true
  },
  foodItem: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the model
export default mongoose.model('Meal', mealSchema);
