import React,{useState , useEffect} from 'react'
import '../styles/home.css'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../reduxStore/actions/user.action'
import { Link } from 'react-router-dom'
function Home() {
 
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchUser())
  },[])


  return (
    <div id='home'>

        <section>
          Secure Your Files Securely and absolutely Free
        </section>
        <div className='nav'>
          <Link to={`/my-files`}>
              My Files
          </Link>
          <Link to={`/upload`}>
              Upload Your File
          </Link>
        </div>

    </div>
  )
}

export default Home