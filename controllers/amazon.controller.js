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
                
                await User.findByIdAndUpdate(req.user._id,{$push:{ 'files':{ key: Key,size , uploadId: UploadId}}})
                

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


const uploadParts = async(req,res,next) =>{
    
    const  {  key} = req.body
   
    let  partNumber
    let files = [...req.user.files]

    let parts = []

    let uploadId

    files.map(el=>{
        if(el.key==key){
           parts = [ ...el.parts ]

           uploadId = el.uploadId
           partNumber =  el.parts.length>0 ? el.parts[el.parts.length-1].PartNumber+1 : 1

        }
    })

    const {ETag} = await  s3.uploadPart({
        Body: req.files[0].buffer,
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        PartNumber: partNumber,
        UploadId: uploadId,
    }).promise()


    parts.push({ETag,PartNumber:partNumber})

    console.log(parts)

    files.forEach(el=>{
        if(el.key==key){
            el.parts = [...parts]
        }
    })


    

    // const user = await User.findOneAndUpdate({_id:req.user._id, 'files.key':key},{$set:{'files.$.parts':{$push : {eTag:ETag, PartNumber: partNumber}}}})
    const user = await User.findOneAndUpdate({_id:req.user._id},{files} , {new:true})
    
    console.log(user)




    return res.status(200)
            .json({
                success:true
            })
}

const uploadFull = async(req,res,next) =>{

    const {key} = req.body

    const fileIndex = req.user.files.findIndex(el=>el.key==key)

    const uploadId = req.user.files[fileIndex].uploadId

    const parts = req.user.files[fileIndex].parts.map(el=>{
        return {ETag:el.ETag, PartNumber: el.PartNumber}
    })

    

    const {Location} = await s3.completeMultipartUpload(
        {
          Bucket: process.env.BUCKET_NAME,
          Key: key,
          MultipartUpload: { Parts: parts },
          UploadId: uploadId,
        }).promise()

    if(!Location) return next(new AppError(404,`Couldn't Get location`))

    console.log(Location)

    await User.findOneAndUpdate({_id:req.user._id, 'files.key':key},{$unset:{'files.$.parts':1, 'files.$.uploadId':1}, $set:{'files.$.status':'completed'}}, {new:true})


    return res.status(200)
                .json({
                    success:true,
                    data:{
                        location:Location
                    }
                })
}


const uploadFile = async(req,res,next)=>{
       const {originalname:name, contentType,size} = req.files[0]

            

        const keyName = `${name.split(".")[0]}-${Math.floor(Math.random()*100000)}.${name.split(".")[1]}`
        console.log(name,keyName)
        const s3Params = {
            Key: keyName,
            Bucket: process.env.BUCKET_NAME,
            Body: req.files[0].buffer
        }
        const result = await s3.upload(s3Params).promise()

        if(!result) return res.json({success:false})

        const user =  await User.findByIdAndUpdate(req.user._id,{$push:{files:{key:keyName, size: req.files[0].size,status:"completed"}}})
        return res.json({success:true, data:{key:keyName}})
}
module.exports = {
    uploadFile           :  catchAsyncError(uploadFile),
    uploadPresignedUrl   :  catchAsyncError(uploadPresignedUrl),
    downloadPresignedUrl :  catchAsyncError(downloadPresignedUrl),
    uploadParts          :  catchAsyncError(uploadParts),
    uploadFull           :  catchAsyncError(uploadFull),
}

