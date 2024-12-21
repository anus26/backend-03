import  express from "express";
import {logoutUser, longinUser, refreshToken, registerUser, sendTestemail, uploadImage} from '../controllers/user.controllers.js'
import { upload } from "../middleware/multer.middleware.js";

const router=express.Router()
router.post("/register", registerUser);
router.post("/longin", longinUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshToken);
router.get("/sendemail",sendTestemail);
router.post("/uploadimage",upload.single("image"),uploadImage)
export default router