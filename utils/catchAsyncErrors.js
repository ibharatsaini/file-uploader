
const catchAsyncError = (controller)=>{
                        return  (req,res,next)=>{
                                return Promise.resolve(controller(req,res,next))
                                                .catch(e=>{
                                                    console.log(e)
                                                    next(e)
                                })

                        }
                    }

module.exports = catchAsyncError
