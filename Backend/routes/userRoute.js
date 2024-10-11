import  express  from "express";
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { searchUser,updateUserDeatils,logout,userDetails,checkPassword,checkEmail,registerUser,caloriesCalculator, dietPlan, profile,workOutPlan, follow, unfollow, getOtherUsers, getMyProfile, targetCalories } from "../controller/userController.js";
import isAuthenticated from "../config/auth.js";
const router=express.Router();

router.route("/loginUser").get(userDetails) //Login User Details
router.route("/updateUser").post(updateUserDeatils)
router.route("/logout").get(logout) //Logout user
router.route("/register").post(registerUser) //registering User
router.route("/checkPassword").post(checkPassword)//verifying password
router.route("/checkEmail").post(checkEmail)//new user or already registered user
router.route("/search-user").post(searchUser)//find the user
router.route("/profile/:id").get(getMyProfile)
router.route("/calculate-calories").post(caloriesCalculator)
router.route("/dietPlan").get(dietPlan)
router.route("/workOutPlan").post(workOutPlan)
router.route("/follow/:id").post(follow);
router.route("/unfollow/:id").post(unfollow);
router.route("/otheruser/:id").get(isAuthenticated, getOtherUsers);
router.route("/updateCalories").post(targetCalories)



export default router