import  express  from "express";
import { createPost } from "../controller/socialController.js";
const router=express.Router();

router.route("/createPost").get(createPost)

export default router