const catchAsyncError = require("./catchAsyncErrors")



async function sendToken(code,res,user){

    const token = await user.generateJWT()

    console.log(token , user)

    const options = {
        httpOnly: true,
        maxAge: 1000*60*6000
    }
    console.log(res)
    return res.cookie('token',token,options)
                // .status(code)
                .redirect(`http://localhost:3000`)
    // return res.status(200).cookie('token',token,options).json({
    //                     success:true,
    //                     data:user
    // })
    
    // return res.status(code || 200).cookie('token',token,options).json({
    //                     success:true,
    //                     data:user
    // })
}

module.exports = catchAsyncError(sendToken)