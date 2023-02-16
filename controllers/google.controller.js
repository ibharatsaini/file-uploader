const { oauth2Client } = require("../app");
const catchAsyncError = require("../utils/catchAsyncErrors")
const {google} = require("googleapis")
const User = require("../models/user.model");
const sendToken = require("../utils/sendToken");
const AppError = require("../utils/errorClass");

const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ];


const getUrl = async (req,res,next)=>{

    const url = await oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });

    if(!url) return next(new AppError(404,`Error during fetching URL`))

    return res.status(200).json({
        success:true,
        data:url
    })   
}

const googleLogin = async(req,res, next)=>{

                        const {code} = req.query

                        if(!code ) return next(new AppError(404,`Code is required to login`))
                        
                        
                        const {tokens} = await oauth2Client.getToken(code)
              
                        if(!tokens) return next(new AppError(404,`Invalid Code Error`))
                
                        oauth2Client.setCredentials(tokens)
                
                        const oauth2 =  google.oauth2({version:"v2" ,auth:oauth2Client})
                
                        const {data} = await oauth2.userinfo.get()

                        const {email,name:fullName} = data

                        let user = await User.findOne({email})

                        if(!user) {
                            user = await User.create({email,fullName,tokens})

                        }else{
                            user = await User.findById(user._id,{tokens}) 
                        }                        

                        return sendToken(201,res,user)


                    }



module.exports = {
    getUrl : catchAsyncError(getUrl),
    googleLogin: catchAsyncError(googleLogin)
}