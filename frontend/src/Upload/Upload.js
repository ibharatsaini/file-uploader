import React,{useState,useEffect} from 'react'
import '../styles/upload.css'
import axios from 'axios'
import { MdImage } from 'react-icons/md'
import { updateFiles } from '../reduxStore/actions/user.action'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { createUpload } from '../reduxStore/actions/upload.action'
import { FiFileText } from 'react-icons/fi'
import "../styles/myfiles.css"
import Progress from '../MyFiles/Progress'
function Upload() {

    const  [files,setFile] = useState(null)
    const {isAuthenticated} = useSelector(state=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const {uploads} = useSelector(state=>state.upload)
    
  
    async function getUpload(file){
      try{
                    setFile(file)
                    console.log(file.type)
                  
                    const result = await ( await fetch(`/api/v1/amazon/upload-url?contentType=${file.type}&fileName=${file.name}`)).json()
                    if(!result.success) return
                   
                    const {uploadUrl:url , key} = result.data
                    
                    console.log('check', url,key)
                    dispatch(createUpload(key,url,file))
                    
        }catch(e){
            toast.error("Upload failed")
            setFile(null)
            // setProgress(0)
        }
      
  
  
    }

    useEffect(()=>{
        if(!isAuthenticated){
            return navigate(`/login`)
        }
    },[])
  
  
    return isAuthenticated &&  (
      <div id='upload'>
  
          
          <div className='upDiv'>
            {  (
                    <label className='inpDiv'>
                    <MdImage style={{fontSize:'40px'}}/>
                    <p>Click here to upload</p>
                            <input type={"file"} 
                                    //  value={file}
                                    style={{display:"none"}}
                                    onChange={({target})=>getUpload(target.files[0])}
                            />
                    </label>
                )
            }
          {/* <button onClick={getUpload}>Upload File</button> */}
          </div>
          {
            uploads.length>0 && (
                                            <div id='files'>
                                { uploads.map(el=>{
                                    return (
                                            <Progress name={el.key} progress={el.progress} />
                                    )
                                })
                                }
                            </div>
            )
          }
  
      </div>
    )
}

export default Upload