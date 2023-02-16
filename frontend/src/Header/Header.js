import React from 'react'
import '../styles/header.css'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reduxStore/actions/user.action'

function Header() {

        const {isAuthenticated} = useSelector(state=>state.user)
        const dispatch =  useDispatch()
         //Header
        console.log(isAuthenticated)
        return (
                <header>
                        <Link to={`/`} id='logo'>
                        File Uploader
                        </Link>
                        <div className='links'>
                                <Link to={`/my-files`}>
                                        My Files
                                </Link> 
                                <Link to={`/upload`}>
                                        Uploads
                                </Link>   
                                <Link to={`/downloads`}>
                                        Downloads
                                </Link>
                                {
                                        !isAuthenticated ? (
                                                <Link to={`/login`}>Login</Link>
                                        ) : (
                                                <div onClick={()=>dispatch(logout())} className='logout'>
                                                        Logout
                                                </div>
                                        )
                                }  
                        </div>
                </header>
        )
}

export default Header