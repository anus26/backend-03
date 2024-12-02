import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/db/index.js"
import cors  from "cors"
import cookieParser  from 'cookie-parser'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import UserRoutes from "./src/routes/user.routes.js";



const app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser())
const JWT_TOkEN_SECRET=process.env.JWT_TOkEN_SECRET


app.get("/", (req, res) => {
  res.send("Hello, World");
});
console.log("Mongo URI:", process.env.MONGO_URI);

const encryptpassword="$2b$10$gqZs1GSEe9XHl64sYPOiwOvIO7YDimLPtwSf6lkDx1M4PTCoE..CK"
const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudXNyYXphMjY4QGdtYWlsLmNvbSIsImlhdCI6MTczMzEwNDk4OH0.Se5MvcN1qAVnmXMHruTBjGbhNkdvsSBZ9jvqcKCDVDI"

app.post("/encryptpassword",(req,res)=>{
    const {password}=req.body
    bcrypt.hash(password, 10, function(err, hash) {
        if(err) return res.status(402).json({message:"password error"})
            res.json({password:hash})
        // Store hash in your password DB.
    });
})

app.post("/checkpassword",(req,res)=>{
    const {password}=req.body
    bcrypt.compare(password, encryptpassword, function(err, result) {
        if(err) return res.status(402).json({message:"occur error"})
        // result == true
    if(result) return res.json({
        message:"password is correct"
    })
    res.status(404).json({message:"incorrect password"})
    });
})

app.post ("/generatetoken",(req,res)=>{
  const {email}=req.body
  const  token = jwt.sign({ email }, JWT_TOkEN_SECRET, );
  res.json({token})
})

app.post("/checktoken",(req,res)=>{
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, function(err, decoded) {
    if(err) return res.json({message:"error occured"})
    console.log(decoded) // bar
  res.json(decoded)
  });
})


app.use('/api/v1',UserRoutes);

// Database Connection and Server Start
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!!", err);
  });