import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-hot-toast'
import '../styles/myfiles.css'
import File from './File'
import { useNavigate } from 'react-router-dom'

function MyFiles() {
    const { isAuthenticated, user} = useSelector(state=>state.user)
    
    const navigate = useNavigate()

    
    async function fileDown(name){
      try{
      // setVisible(false)
            console.log(name)
            const result = await ( await fetch(`/api/v1/amazon/download-url?key=${name}`)).json()
            console.log(result)
            if(!result.success) return

            const {data:url} = result
            console.log(url)
            
            fetch(url).then(response => {
              response.blob().then(blob => {
                  const fileURL = window.URL.createObjectURL(blob);
                  let alink = document.createElement('a');
                  alink.href = fileURL;
                  alink.download = name;
                  alink.click();
              })
            })
      }catch(e){
        console.log(e)
      }
      
    }
    useEffect(()=>{
    if(!isAuthenticated){
     
      return navigate(`/login`)
    }
  },[])
    

    
  return isAuthenticated && (
    <div id='files'>
          {
            user.files.length>0 ? user.files.map(el=>{
              return (
                <File name={el.key} size={el.size} handleDownload={fileDown} />
              )
            }) :( <div className='file'>
                    No Files Currently
            </div>)
          }
    </div>
  )
}

export default MyFiles