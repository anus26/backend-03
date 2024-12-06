import  express from "express";
import {logoutUser, longinUser, refreshToken, registerUser} from '../controllers/user.controllers.js'

const router=express.Router()
router.post("/register", registerUser);
router.post("/longin", longinUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshToken);
export default router