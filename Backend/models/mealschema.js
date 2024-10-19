import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the schema for a single food item
const FoodItemSchema = new Schema({
  name: {
    type: String,
    required: true, // Food item name, e.g., '1 apple'
  },
  calories: {
    type: Number,
    required: true, // Calories for the food item
  },
});

// Define the schema for daily meals
const MealSchema = new Schema({
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snacks'],
    required: true, // Meal type: breakfast, lunch, dinner, or snacks
  },
  foodItems: [FoodItemSchema], // List of food items under each meal
  totalCalories: {
    type: Number,
    default: 0, // Sum of calories for the meal
  },
});

// Define the schema for tracking meals for a user on a specific day
const DailyMealTrackerSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // The date of meal tracking
  },
  meals: {
    breakfast: [MealSchema],
    lunch: [MealSchema],
    dinner: [MealSchema],
    snacks: [MealSchema],
  },
  totalDailyCalories: {
    type: Number,
    default: 0, // Total calories consumed in a day
  },
});

// Pre-save hook to automatically calculate total calories
DailyMealTrackerSchema.pre('save', function (next) {
  const tracker = this;
  tracker.totalDailyCalories = 0;

  Object.keys(tracker.meals).forEach((mealType) => {
    tracker.meals[mealType].forEach((meal) => {
      meal.totalCalories = meal.foodItems.reduce(
        (sum, item) => sum + item.calories,
        0
      );
      tracker.totalDailyCalories += meal.totalCalories;
    });
  });

  next();
});

// Create the model
const DailyMealTracker = mongoose.model('DailyMealTracker', DailyMealTrackerSchema);

export default DailyMealTracker;
