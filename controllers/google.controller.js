const { oauth2Client } = require("../app");
const catchAsyncError = require("../utils/catchAsyncErrors")
const {google} = require("googleapis")
const User = require("../models/user.model");
const sendToken = require("../utils/sendToken");

const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ];

const getUrl = async (req,res,next)=>{
    const url = await oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });

    if(!url) return res.status(404).json({success:false,error:"Could not get url"})

    return res.status(200).json({
        success:true,
        data:url
    })   
}

const googleLogin = async(req,res, next)=>{

                        const {code} = req.query
                        
                        
                        const {tokens} = await oauth2Client.getToken(code)
              
                        if(!tokens) return res.status(404).json({success:false, error:"Token not found"})
                
                        oauth2Client.setCredentials(tokens)
                
                        const oauth2 =  google.oauth2({version:"v2" ,auth:oauth2Client})
                
                        const {data} = await oauth2.userinfo.get()

                        const {email,name:fullName} = data

                        let user = await User.findOne({email})

                        if(!user) {
                            console.log('Not present',user)
                            user = await User.create({email,fullName,tokens})

                        }else{

                            user = await User.findById(user._id,{tokens}) 
                        }

                        

                        console.log(user)
                        
                        

                        return sendToken(301,res,user)

                        

                    }



module.exports = {
    getUrl : catchAsyncError(getUrl),
    googleLogin: catchAsyncError(googleLogin)
}