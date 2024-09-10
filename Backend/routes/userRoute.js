import  express  from "express";
import { caloriesCalculator, dietPlan, profile } from "../controller/userController.js";
const router=express.Router();

router.route("/profile").get(profile)
router.route("/calculate-calories").post(caloriesCalculator)
router.route("/DietPlan").get(dietPlan)

export default router