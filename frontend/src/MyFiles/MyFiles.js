import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import '../styles/myfiles.css'
import File from './File'
import { useNavigate } from 'react-router-dom'
import { createDownload } from '../reduxStore/actions/download.action'

function MyFiles() {
    const { isAuthenticated, user} = useSelector(state=>state.user)
    
    const navigate = useNavigate()


    const dispatch = useDispatch()

    
    async function fileDown(name,size){
      try{
            
            
            dispatch(createDownload(name,size))
            // })
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
                <File name={el.key} 
                      size={el.size} 
                      handleDownload={fileDown} 
                  />
              )
            }) :( <div className='file'>
                    No Files Currently
            </div>)
          }
    </div>
  )
}

export default MyFiles