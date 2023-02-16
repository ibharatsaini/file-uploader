const S3 = require("aws-sdk/clients/s3");
const catchAsyncError = require("../utils/catchAsyncErrors");
const AppError = require("../utils/errorClass");


const s3 = new S3({
    apiVersion:"2006-03-01",
    accessKeyId:process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    signatureVersion: "v4",
})


const uploadPresignedUrl = async(req,res,next)=>{

                const name = req.query.fileName

                if(!name) return next(new AppError(404,`File name is required`))

                const keyName = `${name.split(".")[0]}-${Math.floor(Math.random()*100000)}.${name.split(".")[1]}`

                const s3Params = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: keyName,
                    Expires: 60*60,
                    ContentType: req.query.contentType,
                };


                const uploadUrl = await s3.getSignedUrl("putObject", s3Params);

              
                return res.status(200).json({
                  success:true,
                  data:{
                    uploadUrl,
                    key:s3Params.Key
                  },
                });
}

const downloadPresignedUrl = async(req,res,next)=>{
                const s3Params = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: req.query.key,
                    Expires: 60*60,
                };

                const downloadUrl = await s3.getSignedUrl("getObject",s3Params)

                if(!downloadUrl) return

                console.log(downloadUrl)

                return res.status(200)
                                .json({
                                    success:true,
                                    data:downloadUrl
                                })

}



module.exports = {
    uploadPresignedUrl :  catchAsyncError(uploadPresignedUrl),
    downloadPresignedUrl: catchAsyncError(downloadPresignedUrl)
}

