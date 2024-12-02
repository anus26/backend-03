import userModels from "./src/models/user.models.js";
import jwt from 'jsonwebtoken'
const generateAccessToken = (user) =>{ 
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET , {expiresIn: '6h'});
}
const generateRefreshToken = (user) =>{ 
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET , {expiresIn: '7d'});
}

const registeruser=async(req,res)=>{
    const {email,password}=req.body
    const user=await userModels.findOne({email,password})
    if(!user) return res.status(401).json({message:"user already exicted"})
        const createuser=await userModels.create({
    email,
    password

    })
    res.json({message:"user register successfully"})
}
 export default registeruser