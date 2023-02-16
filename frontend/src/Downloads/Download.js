import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Progress from '../MyFiles/Progress'

function Download() {
    
    const {isAuthenticated} = useSelector(state=>state.user)
    const {downloads} = useSelector(state=>state.download)
    const navigate = useNavigate()

    useEffect(()=>{
      if(!isAuthenticated) return navigate(`/login`)
    })


    return isAuthenticated && (  
      <div id='files'>
      {
        downloads.length>0 ? downloads.map(el=>{
          return (
                  <Progress name={el.key} 
                            progress={el.progress} />
          )
        }) :( <div className='file'>
                No Files Currently
        </div>)
      }
  </div>
    )
}

export default Download