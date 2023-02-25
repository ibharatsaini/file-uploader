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
        
        const url = `/api/v1/amazon/upload-url`     
        
        const size = file.size
        console.log(size)

        const chunkSize = 1024 * 1024 * 5

        console.log(size)
        console.log(file)



        if(chunkSize > size){

        dispatch(addUpload(file.name))

            console.log(chunkSize,size)
            console.log(`dkdkdk`)

            const formData = new FormData()
            formData.append("file",file)

            const result = await (await fetch(`/api/v1/amazon/upload`,{
                method:"PUT",
                body:formData
            })).json()

            if(!result.success) return

            const key = result.data.key


            if(result.success) dispatch(updateFiles({key,size}))


                
            const user = JSON.parse(localStorage.getItem("user")) 

            user.files.push({key,size})

            localStorage.setItem("user",JSON.stringify(user))

            return
        }
    
        const uploaded = await (await fetch( url,
           {
             method:"POST",
             headers:{
                'Content-Type':"application/json"
             },
             body: JSON.stringify({contentType:file.type , name:file.name,size})
            }
        )).json()
            
        console.log(uploaded)
        console.log(chunkSize,size)
        if(uploaded){
               
                console.log(uploaded)
                const {uploadId,key} = uploaded.data
                const totalSize = file.size

                dispatch(addUpload(key))

                let start = 0

                
                    while (start < totalSize) {
                        console.log(start,totalSize)
                        const end = Math.min(start + chunkSize, totalSize);
                        const chunk = file.slice(start, end);
                        const formData = new FormData();
                
                        formData.append('chunk', chunk);
                        formData.append('key',key)

                        await fetch('/api/v1/amazon/upload-chunk', {
                        method: 'POST',
                        body: formData,
                        });
                        start += chunkSize;
                        const percent = Math.floor((start/size)*100)
                        
                        if(percent>100){
                            dispatch(updateUpload({key,progress:100}))
                        }else{
                            dispatch(updateUpload({key,progress:percent}))

                        }
                        
                    }
            
                
                const result = await (await fetch(`/api/v1/amazon/upload-full`,{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify({key,uploadId})
                })).json()
                
                if(result.success) dispatch(updateFiles({key,size}))

                
                const user = JSON.parse(localStorage.getItem("user")) 

                user.files.push({key,size})

                localStorage.setItem("user",JSON.stringify(user))
                        
            

        }
        else{
            return toast.error(`Upload failed`)
        }

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


