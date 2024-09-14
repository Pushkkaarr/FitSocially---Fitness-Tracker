import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const registerLoad = async(req,res)=>{
          try {
            
          } catch (error) {
            console.log.apply(error.message);
          }
} 

const register = async(req,res)=>{
        try {
            
        } catch (error) {
            console.log(error.message); 
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
    try {const { age, gender, height, weight, activityLevel, goal } = req.body;

    if (!age || !gender || !height || !weight || !activityLevel || !goal) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Harris-Benedict Formula to calculate BMR
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === 'female') {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
        return res.status(400).json({ message: 'Invalid gender.' });
    }

    // Adjust BMR based on activity level
    let activityMultiplier;
    switch (activityLevel.toLowerCase()) {
        case 'sedentary':
            activityMultiplier = 1.2;
            break;
        case 'lightly active':
            activityMultiplier = 1.375;
            break;
        case 'moderately active':
            activityMultiplier = 1.55;
            break;
        case 'very active':
            activityMultiplier = 1.725;
            break;
        default:
            return res.status(400).json({ message: 'Invalid activity level.' });
    }

    const TotalDailyEnergyExpenditur = bmr * activityMultiplier;

    // Adjust calories based on the user's goal
    let finalCalories;
    switch (goal.toLowerCase()) {
        case 'weight loss':
            finalCalories = TotalDailyEnergyExpenditur - 500;
            break;
        case 'maintenance':
            finalCalories = TotalDailyEnergyExpenditur;
            break;
        case 'muscle gain':
            finalCalories = TotalDailyEnergyExpenditur + 500;
            break;
        default:
            return res.status(400).json({ message: 'Invalid goal.' });
    }

    res.json({
        BMR: bmr.toFixed(2),
        TotalDailyEnergyExpenditur: TotalDailyEnergyExpenditur.toFixed(2),
        finalCalories: finalCalories.toFixed(2),
        message: `To achieve your goal of ${goal}, your daily calorie intake should be around ${finalCalories.toFixed(2)} calories.`
    });
        
    } catch (error) {
        console.log(error);
    }
}


export const dietPlan=async(req,res)=>{
    const { timeFrame, targetCalories, diet, exclude } = req.body;

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
        console.error('Error fetching meal plan:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to fetch the meal plan.', error: error.response ? error.response.data : error.message });
    }
    
}