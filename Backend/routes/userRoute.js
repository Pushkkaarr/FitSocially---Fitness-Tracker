import  express  from "express";
import { profile } from "../controller/userController.js";
const router=express.Router();

router.route("/profile").get(profile)

export default router