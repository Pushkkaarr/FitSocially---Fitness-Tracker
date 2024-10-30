import axios from "axios";
import dotenv from "dotenv";
import User from "../models/userSchema.js";
import moment from "moment"
import DailyMealTracker from "../models/mealschema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import getUserDetailsFromToken from "../helpers/getUserDetailsFromToken.js";
import Meal from '../models/mealschema.js';  // Import the Meal model
import mongoose from "mongoose";
import { GoogleGenerativeAI } from '@google/generative-ai';

import OpenAI from "openai";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { name,userName,userBio, email,gym_joined, password, profile_pic } = req.body;

    const checkEmail = await User.findOne({ email }); // to find already registered user

    if (checkEmail) {
      return res.status(400).json({
        message: "Already User Exists",
        error: true,
      });
    }

    //password into hashPassword
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      userName,
      userBio,
      email,
      gym_joined,
      profile_pic, //profile spelling wrong hence error
      password: hashPassword,
    };

    const user = new User(payload);
    const userSave = await user.save();

    return res.status(201).json({
      message: "User Registered Successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const checkEmail = await User.findOne({ email }).select("-password");

    if (!checkEmail) {
      return res.status(400).json({
        message: "user not exit",
        error: true,
      });
    }

    return res.status(200).json({
      message: "email verify",
      success: true,
      data: checkEmail,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const checkPassword = async (req, res) => {
  try {
    const { password, userId } = req.body;

    const user = await User.findById(userId);

    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(400).json({
        message: "Please check password",
        error: true,
      });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      http: true,
      secure: true,
    };

    return res.cookie("token", token, cookieOptions).status(200).json({
      message: "Login successfully",
      user,
      token: token,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const userDetails = async (req, res) => {
  try {
    const token = req.cookies.token || "";

    const user = await getUserDetailsFromToken(token);

    return res.status(200).json({
      message: "user details",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const updateUserDeatils = async (req, res) => {
  try {
    const token = req.cookies.token || "";

    const user = await getUserDetailsFromToken(token);

    const { name, profile_pic } = req.body;

    const updateUser = await User.updateOne(
      { _id: user._id },
      {
        name,
        profile_pic,
      }
    );

    const userInfomation = await User.findById(user._id);

    return res.json({
      message: "User Details Successfully Updated",
      data: userInfomation,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const cookieOptions = {
      http: true,
      secure: true,
    };

    return res.cookie("token", "", cookieOptions).status(200).json({
      message: "session out",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const searchUser = async (request, response) => {
  try {
    const { search } = request.body;

    const query = new RegExp(search, "i", "g");

    const user = await User.find({
      $or: [{ name: query }, { email: query }],
    }).select("-password");

    return response.json({
      message: "all user",
      data: user,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const profile = async (req, res) => {
  try {
    return res.json({
      message: "profile page",
    });
  } catch (error) {
    console.log(error);
  }
};

export const caloriesCalculator = async (req, res) => {
  try {
    const { age, gender, height, weight, activityLevel, goal } = req.body;

    // Validation logic
    if (!age || !gender || !height || !weight || !activityLevel || !goal) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const BMR =
      gender === "male"
        ? 66 + 6.23 * weight + 12.7 * height - 6.8 * age
        : 655 + 4.35 * weight + 4.7 * height - 4.7 * age;

    let activityFactor;

    switch (activityLevel) {
      case "sedentary":
        activityFactor = 1.2;
        break;
      case "lightly active":
        activityFactor = 1.375;
        break;
      case "moderately active":
        activityFactor = 1.55;
        break;
      case "very active":
        activityFactor = 1.725;
        break;
      default:
        return res.status(400).json({ error: "Invalid activity level" });
    }

    const TotalDailyEnergyExpenditure = BMR * activityFactor;
    let finalCalories;

    if (goal === "lose") {
      finalCalories = TotalDailyEnergyExpenditure - 500;
    } else if (goal === "gain") {
      finalCalories = TotalDailyEnergyExpenditure + 500;
    } else {
      finalCalories = TotalDailyEnergyExpenditure; // Maintenance
    }

    return res.status(200).json({
      BMR: BMR,
      TotalDailyEnergyExpenditure: TotalDailyEnergyExpenditure,
      finalCalories: finalCalories,
    });
  } catch (error) {
    console.error("Error calculating calories:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while calculating calories." });
  }
};

// Endpoint to get a Diet plan based on user inputs
export const dietPlan = async (req, res) => {
  const { timeFrame, targetCalories, diet, exclude } = req.query;

  if (!timeFrame || !targetCalories) {
    return res
      .status(400)
      .json({ message: "timeFrame and targetCalories are required." });
  }

  try {
    // Spoonacular API request
    const apiKey = process.env.DIET_API_KEY;
    const response = await axios.get(
      "https://api.spoonacular.com/mealplanner/generate",
      {
        params: {
          timeFrame,
          targetCalories,
          diet,
          exclude,
          apiKey,
        },
      }
    );

    // Send the meal plan back to the client
    const mealPlan = response.data;
    res.json({
      message: "Diet plan generated successfully!",
      mealPlan,
    });
  } catch (error) {
    console.error("Error fetching meal plan:", error.message);
    res
      .status(500)
      .json({
        message: "Failed to fetch the meal plan.",
        error: error.message,
      });
  }
};

// Endpoint to get a workout plan based on user inputs

export const workOutPlan = async (req, res) => {
  const {
    goal,
    fitness_level,
    preferences,
    health_conditions,
    schedule,
    lang,
    plan_duration_weeks,
  } = req.body;

  const options = {
    method: "POST",
    url: "https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/generateWorkoutPlan",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.WORKOUT_API_KEY,
      "X-RapidAPI-Host":
        "ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com",
    },
    data: {
      goal,
      fitness_level,
      preferences,
      health_conditions,
      schedule,
      lang,
      plan_duration_weeks,
    },
  };

  try {
    const response = await axios.request(options);
    const workoutPlan = response.data.result;

    if (workoutPlan) {
      // Return the generated workout plan if available
      return res.json(workoutPlan);
    } else {
      // Return a message if the plan is still being generated
      return res
        .status(202)
        .json({
          message: "Workout plan is being generated, please try again shortly.",
        });
    }
  } catch (error) {
    if (error.response && error.response.status === 429) {
      // Handle API quota exceeded (status 429) and return default workout plan
      const defaultWorkoutPlan = {
        message:
          "You have exceeded the monthly quota. Here is a default workout plan.",
        plan: {
          goal: goal || "general fitness",
          fitness_level: fitness_level || "beginner",
          preferences: preferences || ["bodyweight"],
          health_conditions: health_conditions || [],
          schedule: schedule || { days_per_week: 3 },
          plan_duration_weeks: plan_duration_weeks || 4,
          exercises: [
            { name: "Push-ups", sets: 3, reps: 10 },
            { name: "Squats", sets: 3, reps: 15 },
            { name: "Plank", sets: 3, duration: "30s" },
            { name: "Jumping Jacks", sets: 3, duration: "1min" },
          ],
        },
      };

      return res.json(defaultWorkoutPlan);
    } else {
      // Handle other errors and return an error response
      console.error("Error generating workout plan:", error);
      return res.status(500).json({
        error: "Failed to generate workout plan",
        details: error.response ? error.response.data : error.message,
      });
    }
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const otherUsers = await User.find({ _id: { $ne: id } }).select(
      "-password"
    );
    if (!otherUsers) {
      return res.status(401).json({
        message: "Currently do not have any users.",
      });
    }
    return res.status(200).json({
      otherUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

export const follow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const userId = req.params.id;
    const loggedInUser = await User.findById(loggedInUserId); //patel
    const user = await User.findById(userId); //keshav
    if (!user.followers.includes(loggedInUserId)) {
      await user.updateOne({ $push: { followers: loggedInUserId } });
      await loggedInUser.updateOne({ $push: { following: userId } });
    } else {
      return res.status(400).json({
        message: `User already followed to ${user.name}`,
      });
    }
    return res.status(200).json({
      message: `${loggedInUser.name} just follow to ${user.name}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const unfollow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const userId = req.params.id;
    const loggedInUser = await User.findById(loggedInUserId); //patel
    const user = await User.findById(userId); //keshav
    if (loggedInUser.following.includes(userId)) {
      await user.updateOne({ $pull: { followers: loggedInUserId } });
      await loggedInUser.updateOne({ $pull: { following: userId } });
    } else {
      return res.status(400).json({
        message: `User has not followed yet`,
      });
    }
    return res.status(200).json({
      message: `${loggedInUser.name} unfollow to ${user.name}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const targetCalories = async (req, res) => {
    const { userId, targetCalories } = req.body;
    try {
      // Assuming you have a User model
      const user = await User.findById(userId);
      user.targetCalories = targetCalories; // Assuming there's a field for target calories
      await user.save();
      
      res.status(200).json({ message: 'Target calories updated successfully!' });
    } catch (error) {
      console.error('Error updating target calories:', error);
      res.status(500).json({ message: 'Server error' });
    }
};

const geminiApiKey = process.env.GEMINI_API_KEY;
const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;

export const chatBot = async (req, res) => {
  const userMessage = req.body.message;
  console.log(userMessage);
    // Ensure userMessage comes from req.body

  try {
    // Make the API call to the Gemini API
    const response = await axios.post(geminiApiUrl, {
      contents: [
        {
          parts: [
            {
              text: userMessage,  // Use dynamic user input
            },
          ],
        },
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Extract the bot's reply
    const botReply = response.data;
    res.json({ reply: botReply });
  } catch (error) {
    console.error("Error details:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.response ? error.response.data : 'Failed to connect to chatbot API' });
  }
};


export const MealTracker = async (req, res) => {
  try {
    const { userId, mealType, foodItem } = req.body;

    // Validate input
    if (!foodItem || !mealType || !userId) {
      return res.status(400).json({ error: 'User ID, Meal type, and Food item are required' });
    }

    // Edamam API URL with parameters
    const edamamURL = `https://api.edamam.com/api/nutrition-data?app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&nutrition-type=cooking&ingr=${encodeURIComponent(foodItem)}`;

    // Fetch calories information from Edamam API
    const response = await axios.get(edamamURL);
    const calories = response.data.calories;

    // Save meal data to the Meal schema
    const newMeal = new Meal({
      user: userId,
      mealType,
      foodItem,
      calories,
      createdAt: new Date(),
    });

    // Save the new meal entry to the database
    await newMeal.save();

    // Return the saved meal entry
    res.json({
      message: `${foodItem} added to ${mealType}`,
      meal: newMeal,  // Return the saved meal entry
    });
    console.log(newMeal);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch calorie information or save the meal' });
  }
};




export const mealfetch = async (req, res) => {
  const { userId } = req.query; // Get userId from query string

  // Check if userId is valid
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    // Define the start and end of the current day (UTC)
    const todayStart = moment.utc().startOf('day').toDate();
    const todayEnd = moment.utc().endOf('day').toDate();

    // Find meals for the user within the current day
    const meals = await Meal.find({
      user: userId, // Use the userId directly as it should be an ObjectId
      createdAt: {
        $gte: todayStart,
        $lt: todayEnd,
      },
    });

    // If no meals are found, return an empty array
    if (!meals || meals.length === 0) {
      return res.status(200).json({ meals: [], totalCalories: 0 });
    }

    // Calculate the total calories for the day
    const totalCalories = meals.reduce((total, meal) => total + meal.calories, 0);

    // Format the meals data
    const formattedMeals = meals.map(meal => ({
      id: meal._id,
      date: meal.createdAt,
      mealType: meal.mealType,
      foodItem: meal.foodItem,
      calories: meal.calories,
    }));

    // Return the formatted meals and total calories
    return res.status(200).json({
      meals: formattedMeals,
      totalCalories,
    });
  } catch (error) {
    console.error('Error fetching meals:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const fetchDataController = async (req, res) => {
  if (!req.body?.formData) {
    return res.status(400).json({
      success: false,
      error: 'Missing required formData in request body'
    });
  }

  let genAI;
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  } catch (error) {
    console.error('Gemini initialization error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to initialize Gemini client'
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `You are a fitness plan generator API that ONLY returns valid JSON.
Generate a fitness plan based on these parameters: ${JSON.stringify(req.body.formData)}.
The response MUST be a valid JSON object with this exact structure:
{
  "Workout_Plan_Description": "<200 char max description>",
  "Months": [
    {
      "plan_for_each_week_in_the_month": {
        "days": [
          {
            "exercises": [
              {
                "name": "<exercise name>",
                "reps": "<number of reps>",
                "sets": "<number of sets>",
                "target_muscle": "<muscle group>"
              }
            ],
            "duration": <number in minutes>
          }
        ]
      }
    }
  ]
}
Return ONLY the JSON object, no additional text.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
        topK: 1,
        topP: 0.1,
        maxOutputTokens: 1000,
      }
    });

    const response = await result.response;
    const responseText = response.text().trim();

    // Ensure response is valid JSON
    const cleanedResponse = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .replace(/^[^{]*/, '')
      .replace(/[^}]*$/, '')
      .trim();

    // Check for balanced brackets
    const openBraces = (cleanedResponse.match(/{/g) || []).length;
    const closeBraces = (cleanedResponse.match(/}/g) || []).length;
    const openBrackets = (cleanedResponse.match(/\[/g) || []).length;
    const closeBrackets = (cleanedResponse.match(/]/g) || []).length;

    if (openBraces !== closeBraces || openBrackets !== closeBrackets) {
      console.error('Unbalanced JSON response:', cleanedResponse);
      return res.status(500).json({
        success: false,
        error: 'Unbalanced JSON response from Gemini API',
        details: cleanedResponse,
      });
    }

    // Attempt JSON parsing
    let data;
    try {
      data = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      return res.status(500).json({
        success: false,
        error: 'Failed to parse Gemini API response',
        details: {
          message: parseError.message,
          response: cleanedResponse,
        },
      });
    }

    // Validate structure
    if (!data.Workout_Plan_Description || !Array.isArray(data.Months)) {
      return res.status(500).json({
        success: false,
        error: 'Invalid response structure from Gemini API',
        details: {
          response: cleanedResponse,
        },
      });
    }

    if (data.Workout_Plan_Description.length > 200) {
      data.Workout_Plan_Description = data.Workout_Plan_Description.substring(0, 200);
    }

    res.setHeader('Cache-Control', 'private, max-age=3600');
    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate workout plan',
      details: process.env.NODE_ENV === 'development' ? {
        stack: error.stack,
        message: error.message
      } : undefined
    });
  }
};
