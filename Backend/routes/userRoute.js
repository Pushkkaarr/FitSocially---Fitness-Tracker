import  express  from "express";
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
//import userController from '../controller/userController.js';
import { caloriesCalculator, dietPlan, profile } from "../controller/userController.js";
const router=express.Router();

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended:true}));  
// //router.set('view engine','ejs');
// router.set('views','//frontend');

// router.use(express.static('public'));

// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//       cb(null,path.join(__dirname,'..////images folder'));
//     },
//     filename:function(req,file,cb){
//        const name = Date.now()+'-'+file.originalname;
//        cb(null,name);
//     }
// })
// const upload = multer({storage:storage});
// router.get('/register',userController.registerLoad);
// router.get('/register',upload.single('image'),userController.register); 

router.route("/profile").get(profile)
router.route("/calculate-calories").post(caloriesCalculator)
router.route("/DietPlan").get(dietPlan)

export default router