const User = require("../models/user.model")
const catchAsyncError = require("../utils/catchAsyncErrors")
const AppError = require("../utils/errorClass")


const myDetails = async(req,res,next)=>{
        
        const user = await User.findById(req.user._id)

        if(!user) return next(new AppError(404,`User not found`))

        delete user.tokens

        return res.status(200)
                    .json({
                        success:true,
                        data:user
                    })
        
}

const updateFiles = async(req,res,next) => {
        
        const { key, size } = req.body

        console.log(key,size)
        if(!key || !size) return next(new AppError(404,`Key and size of the file required`))

        const user = await User.findById(req.user._id)

        user.files.push({key,size})

        await user.save()


        return res.status(200)
                    .json({
                        success:true,
                        data:{
                            key,
                            size
                        }
                    })

        
}

const logoutUser = async(req,res,next)=>{

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    
    return  res.status(200).json({
                success: true,
                data:`Logged out`
            })
}

module.exports = {
    myDetails    :   catchAsyncError(myDetails),
    updateFiles  :   catchAsyncError(updateFiles),
    logoutUser   :   catchAsyncError(logoutUser)
}