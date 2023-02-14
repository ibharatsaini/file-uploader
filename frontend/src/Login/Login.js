import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import '../styles/login.css'



function Login() {

    function googleLogin(){
        fetch(`/api/v1/google/get-url`)
            .then(res=>res.json())
            .then(({success,data})=>{
                if(!success) return 
                window.location.href=(data)
            })
    }
  return (
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