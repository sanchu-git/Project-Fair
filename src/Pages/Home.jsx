import React, { useEffect, useState } from 'react'
import landingImg from '../assets/Images/world.png'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const navigate = useNavigate()
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  },[])


  const handleProjectPage = ()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      toast.warning("Please Login to Explore Our Project!!!")

    }
  }
  return (
    <>
      {/* landing part */}

      <div style={{ width: '100%', height: '100vh', background: 'greenyellow' }} className='rounded'>
        <div style={{ height: '100%' }} className='container'>
          <div style={{ height: '100%' }} className='row align-items-center'>
            <div className='col-lg-5'>
              <h1 style={{ fontSize: '80px' }} className='fw-bolder text-danger-emphasis'><i style={{ height: '80px' }} class="fa-solid fa-paperclip"></i>Project Fair</h1>
              <p>
                One Stop Destination For All Software Development Projects. Where User Can add and manage their projects.
                As well as access all projects available in our website... What are you waiting For!!!
                {isLoggedIn?<Link className="btn btn-warning mt-2" to={'/dashboard'}>Manage Your Project <i class="fa-solid fa-arrow-right"></i></Link>:
                <Link className="btn btn-warning mt-2" to={'/login'}>Starts to Explore <i class="fa-solid fa-arrow-right"></i></Link>}
              </p>
            </div>
            <div className='col-lg-2'></div>
            <div className='col-lg-5'>
              <img className='img-fluid' src={landingImg} alt="No Image" />
            </div>
          </div>
        </div>
      </div>

      {/* All Projects */}
      <div className='projects mt-5'>
        <h1 className='text-center mb-5'>Explore Our Projects</h1>
        <marquee>
          <div className="d-flex justify-content-between">
            <div className="me-5">
              <ProjectCard/>
            </div>
          </div>
        </marquee>
        <div className="text-center">
          <button onClick={handleProjectPage} className='btn btn-link'>view more Projects</button>
        </div>
      </div>


      <ToastContainer autoClose={3000} theme='colored' />

    </>
  )
}

export default Home