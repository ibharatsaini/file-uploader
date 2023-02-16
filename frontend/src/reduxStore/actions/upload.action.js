import axios from 'axios'
import { toast } from 'react-hot-toast'
import { updateFiles } from './user.action'
export const CREATE_UPLOAD = 'CREATE_UPLOAD'
export const UPDATE_UPDLOAD = 'UPDATE_UPLOAD'
export const ADD_UPLOAD = 'ADD_UPLOAD'

export const addUpload = (data)=>{
    return {
        type: ADD_UPLOAD,
        payload: data
    }
}

export const createUpload = (key,url,file)=>async(dispatch)=>{
        try{
            dispatch(addUpload(key))
            const uploaded = await axios.put(url,file,{
                                    onUploadProgress:(p)=>{
                                        console.log(p)
                                        dispatch(updateUpload({key,progress:Math.floor(p.progress*100)}))
                                    }
                                })
            if(uploaded){

                const result =  await axios.post(`/api/v1/user/update-files`,{
                            key,
                            size:file.size
                        })

                if(result.data.success){
                
                    toast.success("Uploaded successfully")

                    dispatch(updateFiles({key,size:file.size}))
                }

            }else{
                return toast.error(`Upload failed`)
            }

                    // return navigate(`/my-files`)
        }catch(e){
            console.log(e)
        }
        
}

export const updateUpload = (data)=>{
    return {
        type: UPDATE_UPDLOAD,
        payload: data
    }
}


