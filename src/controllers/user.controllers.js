import User from "../models/user.models.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
const generateAccessToken = (user) =>{ 
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_TOKEN_SECRET , {expiresIn: '6h'});
}
const generateRefreshToken = (user) =>{ 
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_TOKEN_SECRET , {expiresIn: '7d'});
}
// registerUser
const registerUser=async(req,res)=>{
    const {email,password}=req.body
//     if (!user) return res.status(400).json({message:"email is requried"})
//    if (!password) return res.status(400).json({message:"password is requried"}) 
    
    const user=await User.findOne({email:email})
    if(user) return res.status(409).json({message:"user already exicts"})
        const createUser=await User.create({
    email,
    password,

    })
    res.json({message:"user register successfully",data:createUser})
}
// login user
const longinUser=async(req,res)=>{
    const {email,password}=req.body
    if(!email)return res.status(400).json({message:"email is required"})
    if(!password)return res.status(400).json({message:"password is required"})    
        const user=await User.findOne({email})
    if(!user)return res.status(404).json({message:'not found'})
        const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid)return res.status(404).json({message:"is not valid password"})

        const accessToken=generateAccessToken(user)
        const refreshToken = generateRefreshToken(user);
        res.cookie("refreshToken",refreshToken,{http:true,secure:false})
        res.json({
            message:"user login successfully",
            accessToken,
            refreshToken,
            data:user,
        })
}

// logout user

const logoutUser=async(req,res)=>{
    res.clearCookie("refreshToken")
    res.json({message:"user logout successfully"})
    
}

// refreshToken
const refreshToken=async(req,res)=>{
    const refreshToken=req.cookies.refreshToken||req.body.refreshToken
    if(!refreshToken)return res.status(401).json({message:"Token not found"})
        const decodedToken=jwt.verify(refreshToken,process.env.REFRESH_JWT_TOKEN_SECRET)
    const user=await User.findOne({email:decodedToken.email})
    if(!user)return res.stauts(404).json({message:"user not found"})
        const generateToken=generateAccessToken(user)
    res.json({message:"generated Token" ,accesstoken:generateToken})
    res.json({decodedToken})
}
 export {registerUser,longinUser,logoutUser,refreshToken}