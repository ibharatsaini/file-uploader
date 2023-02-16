import React, { useEffect } from 'react'
import {FcGoogle} from 'react-icons/fc'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'



function Login() {
  const {isAuthenticated} = useSelector(state=>state.user)
  
  const navigate = useNavigate()
    function googleLogin(){
        fetch(`/api/v1/google/get-url`)
            .then(res=>res.json())
            .then(({success,data})=>{
                if(!success) return 
                window.location.href=(data)
            })
            .catch(e=>console.log(e))
    }

    useEffect(()=>{
      if(isAuthenticated) return navigate(`/`)
    })

    return !isAuthenticated && (
      <div id='login'>
          <div className='head'>
              <h2>Welcom To File Uploader</h2>
              <h3>Login Using Google</h3>
          </div>
          <div onClick={googleLogin} className='googleLogin'>
            <FcGoogle className='googleIcon' />  
            <span>
            Continue using Google Account
            </span>
          </div>
      </div>
    )
}

export default Login