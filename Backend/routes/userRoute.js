import  express  from "express";
import { caloriesCalculator, dietPlan, profile, workOutPlan } from "../controller/userController.js";
const router=express.Router();

router.route("/profile").get(profile)
router.route("/calculate-calories").post(caloriesCalculator)
router.route("/dietPlan").get(dietPlan)
router.route("/workOutPlan").post(workOutPlan)

export default router