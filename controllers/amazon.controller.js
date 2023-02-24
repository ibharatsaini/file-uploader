const AWS = require("aws-sdk");
const catchAsyncError = require("../utils/catchAsyncErrors");
const AppError = require("../utils/errorClass");
const User = require("../models/user.model")



//config update

AWS.config.update({
    accessKeyId:process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
})

const s3 = new AWS.S3()

// s3.upload()


const uploadPresignedUrl = async(req,res,next)=>{

    

                const {name, contentType,size} = req.body

            

                const keyName = `${name.split(".")[0]}-${Math.floor(Math.random()*100000)}.${name.split(".")[1]}`
                console.log(name,keyName)
               


                const {UploadId, Key} = await s3.createMultipartUpload({
                                            Bucket: process.env.BUCKET_NAME,
                                            Key: keyName
                                        }).promise()
                
                await User.findByIdAndUpdate(req.user._id,{$push:{ 'files':{ key: Key,size}}})
                

                if(!UploadId || !Key) return res.status(404).json({success:false})

                return res.status(200)
                            .json({
                                success:true,
                                data:{
                                    uploadId: UploadId,
                                    key: Key
                                }
                            })
               
                
}


const downloadPresignedUrl = async(req,res,next)=>{
                
                const { key } = req.query

                if(!key) return next(new AppError(404, 'Key is required'))

               
                const s3Params = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: key,
                };
                
                const down = s3.getObject(s3Params).createReadStream()
               
                
                res.setHeader(`Content-Disposition`, `attachment; filename=${key}`);
                res.setHeader("Content-Type", "application/octet-stream");

                down.pipe(res)
}

const parts = []

const uploadParts = async(req,res,next) =>{
    
    const  {  key, uploadId} = req.body
   
    // const fi = await User.findOne({_id:req.user._id , files:{key}})
    let  partNumber
    console.log(`loop`)
    req.user.files.map(el=>{
        console.log(el.key,key)
        if(el.key==key){
            console.log(el.key)
           partNumber =  el.parts ? el.parts[-1].PartNumber+1 : 1

        }
    })

    console.log(partNumber , partNumber+1)

    const {ETag} = await  s3.uploadPart({
        Body: req.files[0].buffer,
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        PartNumber: partNumber,
        UploadId: uploadId,
    }).promise()

    

    const user = await User.findOneAndUpdate({_id:req.user._id, 'files.key':key},{$set:{'files.$.parts':{$push : {ETag, PartNumber: partNumber}}}})
    
    console.log(user)

    parts.push({ETag,PartNumber: partNumber})



    return res.status(200)
            .json({
                success:true
            })
}

const uploadFull = async(req,res,next) =>{

    const {key, uploadId} = req.body

    const {Location} = await s3.completeMultipartUpload(
        {
          Bucket: process.env.BUCKET_NAME,
          Key: key,
          MultipartUpload: { Parts: parts },
          UploadId: uploadId,
        }).promise()

    if(!Location) return next(new AppError(404,`Couldn't Get location`))

    return res.status(200)
                .json({
                    success:true,
                    data:{
                        location:Location
                    }
                })
}


module.exports = {
    uploadPresignedUrl   :  catchAsyncError(uploadPresignedUrl),
    downloadPresignedUrl :  catchAsyncError(downloadPresignedUrl),
    uploadParts          :  catchAsyncError(uploadParts),
    uploadFull           :  catchAsyncError(uploadFull)
}

