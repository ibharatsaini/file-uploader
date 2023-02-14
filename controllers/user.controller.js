const User = require("../models/user.model")
const catchAsyncError = require("../utils/catchAsyncErrors")


const myDetails = async(req,res,next)=>{
        
        const user = await User.findById(req.user._id)

        if(!user) return res.json({success:false})

        delete user.tokens

        return res.status(200)
                    .json({
                        success:true,
                        data:user
                    })
        
}

const updateFiles = async(req,res,next) => {
        // const { user } = req
        console.log('update files')
        const { key, size } = req.body

        console.log(key,size)
        if(!key || !size) return res.json({success:false})

        const user = await User.findById(req.user._id)

        user.files.push({key,size})

        await user.save()

        console.log(user)

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
            })
}

module.exports = {
    myDetails    :   catchAsyncError(myDetails),
    updateFiles  :   catchAsyncError(updateFiles),
    logoutUser   :   catchAsyncError(logoutUser)
}