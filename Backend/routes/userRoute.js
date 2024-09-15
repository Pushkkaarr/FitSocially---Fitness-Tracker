import  express  from "express";
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
//import userController from '../controller/userController.js';
import { checkEmail,registerUser,caloriesCalculator, dietPlan, profile,workOutPlan } from "../controller/userController.js";
const router=express.Router();

router.route("/register").post(registerUser)
router.route("/checkEmail").post(checkEmail)
router.route("/profile").get(profile)
router.route("/calculate-calories").post(caloriesCalculator)
router.route("/dietPlan").get(dietPlan)
router.route("/workOutPlan").post(workOutPlan)

export default router