const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const catchAsyncError = require("../utils/catchAsyncErrors")

async function authenticateUser(req,res,next){
        // console.log(req.cookies)
        const token =  req.cookies?.token
        
        console.log(token)
        if(!token) return res.status(404).json({success:false,error:"Token not found"})

        const {id} = jwt.verify(token,process.env.JWT_SECRET)

        console.log(id)
        const user = await User.findById(id) 
        
        if(!user)  return res.status(404).json({success:false,error:"User not found"})
        console.log(user)
        req.user = user
        next()
}
module.exports = catchAsyncError(authenticateUser)