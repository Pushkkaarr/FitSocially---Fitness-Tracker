import  express  from "express";
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { logout,userDetails,checkPassword,checkEmail,registerUser,caloriesCalculator, dietPlan, profile,workOutPlan } from "../controller/userController.js";
const router=express.Router();

router.route("/loginUser").get(userDetails) //Login User Details
router.route("/logout").get(logout) //Logout user
router.route("/register").post(registerUser) //registering User
router.route("/checkPassword").post(checkPassword)//verifying password
router.route("/checkEmail").post(checkEmail)//new user or already registered user
router.route("/profile").get(profile)
router.route("/calculate-calories").post(caloriesCalculator)
router.route("/dietPlan").get(dietPlan)
router.route("/workOutPlan").post(workOutPlan)

export default router