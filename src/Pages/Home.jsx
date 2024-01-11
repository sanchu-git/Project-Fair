import React from 'react'
import landingImg from '../assets/Images/world.png'
import { Link } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'

function Home() {
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
                <Link className="btn btn-warning mt-2" to={'/login'}>Starts to Explore <i class="fa-solid fa-arrow-right"></i></Link>
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
          <button className='btn btn-link'>view more Projects</button>
        </div>
      </div>




    </>
  )
}

export default Home