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

// export const createUpload = (key,url,file)=>async(dispatch)=>{
//         try{
//             dispatch(addUpload(key))
//             const uploaded = await axios.put(url,file,{
//                                     onUploadProgress:(p)=>{
//                                         console.log(p)
//                                         dispatch(updateUpload({key,progress:Math.floor(p.progress*100)}))
//                                     }
//                                 })
//             if(uploaded){

//                 const result =  await axios.post(`/api/v1/user/update-files`,{
//                             key,
//                             size:file.size
//                         })

//                 if(result.data.success){
                
//                     toast.success("Uploaded successfully")

//                     dispatch(updateFiles({key,size:file.size}))
//                 }

//             }else{
//                 return toast.error(`Upload failed`)
//             }

//                     // return navigate(`/my-files`)
//         }catch(e){
//             console.log(e)
//         }
        
// }

export const createUpload = (key,url,file)=>async(dispatch)=>{
    try{
        dispatch(addUpload(key))
        // console.log
        const url = `/api/v1/amazon/upload-url`     
        const formData = new FormData();
        // const url = '/api/v1/amazon/upload-url?contentType=${';
        // formData.append('file', file);
    
        const uploaded = await (await fetch( url,
           {
             method:"POST",
             headers:{
                'Content-Type':"application/json"
             },
             body: JSON.stringify({contentType:file.type , name:file.name})
            }
        )).json()
            
        console.log(uploaded)
        // let uploadId,key;
        if(uploaded){
               
                console.log(uploaded)
                const {uploadId,key} = uploaded.data
                console.log(uploadId,key)
                // consodd.l
                const fileSize = file.size
                let partNumber = 1
                const chunkSize = 1024 * 1024 * 5
                let offset = 0
                while (offset < fileSize) {
                    console.log(offset,fileSize)
                    // if(offset == 3) break
                    const end = Math.min(offset + chunkSize, fileSize);
                    const chunk = file.slice(offset, end);
                    console.log(chunk,end,offset)
                    const formData = new FormData();
                    formData.append('partNumber', partNumber);
                    formData.append('uploadId', uploadId);
                    formData.append('chunk', chunk);
                    formData.append('key',key)
                    console.log(formData.get("chunk"))
                    await fetch('/api/v1/amazon/upload-chunk', {
                      method: 'POST',
                      body: formData,
                    });
                    // console.log(await res.json())
                    offset += chunkSize;
                    partNumber++;
                    console.log(offset,partNumber)
                  }
                
                //  { uploadId , key} =uploaded.data
                const result = await (await fetch(`/api/v1/amazon/upload-full`,{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                      },
                    body: JSON.stringify({key,uploadId})
                })).json()
                console.log(result)
            // const result =  await axios.post(`/api/v1/user/update-files`,{
            //             key,
            //             size:file.size
            //         })

            // if(result.data.success){
            
            //     toast.success("Uploaded successfully")

            //     dispatch(updateFiles({key,size:file.size}))
            // }

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


