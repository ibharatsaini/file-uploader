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
    
}

module.exports = catchAsyncError(sendToken)