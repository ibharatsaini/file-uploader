import React,{useState,useEffect} from 'react'
import '../styles/upload.css'
import axios from 'axios'
import { MdImage } from 'react-icons/md'
import { updateFiles } from '../reduxStore/actions/user.action'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
function Upload() {

    const  [files,setFile] = useState(null)
    const [progress,setProgress] = useState(0)
    const {isAuthenticate} = useSelector(state=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    
  
    async function getUpload(file){
      try{
                    setFile(file)
                    console.log(file.type)
                  
                    const result = await ( await fetch(`/api/v1/amazon/upload-url?contentType=${file.type}&fileName=${file.name}`)).json()
                    if(!result.success) return
                   
                    const {uploadUrl:url , key} = result.data
                    
                    console.log('check', url,key)
                    const check = await axios.put(url,file,{
                                        onUploadProgress:(p)=>{
                                            setProgress(Math.floor(p.progress*100))
                                        }
                                    })
                    
                    if(check){
                        const result =  await axios.post(`/api/v1/user/update-files`,{
                            key,
                            size:file.size
                        })

                        if(!result.data.success) return
                        
                        toast.success("Uploaded successfully")

                        dispatch(updateFiles({key,size:file.size}))

                        return navigate(`/my-files`)
                    }
        }catch(e){
            toast.error("Upload failed")
            setFile(null)
            setProgress(0)
        }
      
  
  
    }

    useEffect(()=>{
        if(!isAuthenticate){
            return navigate(`/login`)
        }
    },[])
  
  
    return isAuthenticate &&  (
      <div id='upload'>
  
          {/* <div className='login'>
              Login With Google
          </div> */}
          <div className='upDiv'>
            { !files ? (
                    <label className='inpDiv'>
                    <MdImage style={{fontSize:'40px'}}/>
                    <p>Click here to upload</p>
                            <input type={"file"} 
                                    //  value={file}
                                    style={{display:"none"}}
                                    onChange={({target})=>getUpload(target.files[0])}
                            />
                    </label>
                ):
                (
                    <div className='inpDiv'>
                        <h3>Uploading...</h3>
                        <div className='progressBar'>
                            <span>{progress}%</span>
                            <div style={{width:`${progress}%`}} className='progress'>
                            </div>
                        </div>
                    </div>
                )
            }
          {/* <button onClick={getUpload}>Upload File</button> */}
          </div>
          {/* <button onClick={getDownload}>Download URL</button> */}
  
      </div>
    )
}

export default Upload