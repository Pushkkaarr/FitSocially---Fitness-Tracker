import axios from 'axios';
import dotenv from 'dotenv';
import User from '../models/userSchema.js'
import bcryptjs from'bcryptjs';
import jwt from 'jsonwebtoken'
import getUserDetailsFromToken  from '../helpers/getUserDetailsFromToken.js';

dotenv.config();

export const registerUser = async(req,res)=>{
        try {
            const{name,email,password,proifle_pic} = req.body

            const checkEmail = await User.findOne({email}) // to find already registered user

             if(checkEmail){
                return res.status(400).json({
                    message : "Already User Exists",
                    error:true
                })
             }

             //password into hashPassword
             const salt = await bcryptjs.genSalt(10)
             const hashPassword = await bcryptjs.hash(password,salt)

             const payload ={
                name,
                email,
                profile_pic,//profile spelling wrong hence error
                password : hashPassword
             }

             const user = new User(payload)
             const userSave = await user.save()

             return res.status(201).json({
                message : "User Registered Successfully",
                data : userSave,
                success : true
             })

        } catch (error) {
            return res.status(500).json({
                message:error.message || error,
                error:true
            })
        }
}

export const checkEmail = async(req,res)=>{
    try {
        const { email } = req.body

        const checkEmail = await User.findOne({email}).select("-password")

        if(!checkEmail){
            return res.status(400).json({
                message : "user not exit",
                error : true
            })
        }

        return res.status(200).json({
            message : "email verify",
            success : true,
            data : checkEmail
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

export const checkPassword = async(req,res)=>{
    try {
        const { password, userId } = req.body

        const user = await User.findById(userId)

        const verifyPassword = await bcryptjs.compare(password,user.password)

        if(!verifyPassword){
            return res.status(400).json({
                message : "Please check password",
                error : true
            })
        }

        const tokenData = {
            id : user._id,
            email : user.email 
        }
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{ expiresIn : '1d'})

        const cookieOptions = {
            http : true,
            secure : true
        }

        return res.cookie('token',token,cookieOptions).status(200).json({
            message : "Login successfully",
            token : token,
            success :true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

export const userDetails = async(req,res)=>{
    try {
        const token = req.cookies.token || ""

        const user = await getUserDetailsFromToken(token)

        return res.status(200).json({
            message : "user details",
            data : user
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

export const updateUserDeatils = async(req,res)=>{
    try {
        const token = req.cookies.token || ""

        const user = await getUserDetailsFromToken(token)

        const { name, profile_pic } = req.body

        const updateUser = await User.updateOne({ _id : user._id },{
            name,
            profile_pic
        })

        const userInfomation = await User.findById(user._id)

        return res.json({
            message : "User Details Successfully Updated",
            data : userInfomation,
            success : true
        })


    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

export const logout = async(req,res)=>{
    try {
        const cookieOptions = {
            http : true,
            secure : true
        }

        return res.cookie('token','',cookieOptions).status(200).json({
            message : "session out",
            success : true
    })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}
export const profile=async(req,res)=>{
    try {
        return res.json({
            message:"profile page"
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const caloriesCalculator=async(req,res)=>{
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
        return res.status(500).json({ error: "An error occurred while calculating calories." });
      }
}

// Endpoint to get a Diet plan based on user inputs
export const dietPlan=async(req,res)=>{
    const { timeFrame, targetCalories, diet, exclude } = req.query;

    if (!timeFrame || !targetCalories) {
        return res.status(400).json({ message: 'timeFrame and targetCalories are required.' });
    }

    try {
        // Spoonacular API request
        const apiKey =process.env.DIET_API_KEY;
        const response = await axios.get('https://api.spoonacular.com/mealplanner/generate', {
            params: {
                timeFrame,
                targetCalories,
                diet,
                exclude,
                apiKey
            }
        });

        // Send the meal plan back to the client
        const mealPlan = response.data;
        res.json({
            message: 'Diet plan generated successfully!',
            mealPlan
        });
    } catch (error) {
        console.error('Error fetching meal plan:', error.message);
        res.status(500).json({ message: 'Failed to fetch the meal plan.', error: error.message });
    }    
    
}



// Endpoint to get a workout plan based on user inputs
export const workOutPlan= async (req, res) => {
    const {
        goal,
        fitness_level,
        preferences,
        health_conditions,
        schedule,
        lang,
        plan_duration_weeks
      } = req.body;
    
      const options = {
        method: 'POST',
        url: 'https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/generateWorkoutPlan',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.WORKOUT_API_KEY,
          'X-RapidAPI-Host': 'ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com'
        },
        data: {
          goal,
          fitness_level,
          preferences,
          health_conditions,
          schedule,
          lang,
          plan_duration_weeks
        }
      };
    
      try {
        const response = await axios.request(options);
        const workoutPlan = response.data.result;
    
        // Check if the result is ready
        if (workoutPlan) {
          res.json(workoutPlan);
        } else {
          res.status(202).json({ message: 'Workout plan is being generated, please try again shortly.' });
        }
      } catch (error) {
        console.error('Error generating workout plan:', error);
        res.status(500).json({ error: 'Failed to generate workout plan', details: error.response ? error.response.data : error.message });
    }
    };
    
