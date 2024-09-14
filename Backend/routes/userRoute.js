import  express  from "express";
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
//import userController from '../controller/userController.js';
import { registerUser,caloriesCalculator, dietPlan, profile } from "../controller/userController.js";
const router=express.Router();

router.route("/register").post(registerUser)
router.route("/profile").get(profile)
router.route("/calculate-calories").post(caloriesCalculator)
router.route("/DietPlan").get(dietPlan)

export default router