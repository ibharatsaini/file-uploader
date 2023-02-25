const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")


const Token = new mongoose.Schema({
    access_token:String,
    refresh_token:String,
    scope:String,
    token_type:String,
    id_token:String,
    expiry_date:String
})
const User = new mongoose.Schema({
                   
                    fullName:{
                        type:String,
                        required:[true,"Full Name is required"],
                    },
                    email:{
                        type:String,
                    },
                    files:[
                        {
                           key:String,
                           size:String,
                           uploadId:String,
                           status:{
                            type:String,
                            enum: ['uploading','completed'] ,
                            default:'uploading'
                           },
                           parts:[{
                                ETag: String,
                                PartNumber: Number
                           }]
                        }
                    ],
                    tokens:{
                        access_token:String,
                        refresh_token:String,
                        scope:String,
                        token_type:String,
                        id_token:String,
                        expiry_date:String,    
                    }
                    
            },
            {
                timestamps:true,
                new: true
            })

User.methods.generateJWT  = function(){
    return jwt.sign( {id:this._id},
                        process.env.JWT_SECRET,
                        {expiresIn: process.env.JWT_EXPIRES}
                    )
}


module.exports =  mongoose.model("users",User)