import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Header(insideDashboard) {
  return (
    <>
      <Navbar expand="lg" style={{ background: 'greenyellow' }}>
        <Container>
          <Navbar.Brand href=""><Link to={'/'} style={{ textDecoration: 'none' }}><h1 style={{ fontSize: '30px' }} className='fw-bolder text-dark'><i style={{ height: '20px', }} class="fa-solid fa-paperclip"></i>Project Fair</h1></Link> 
           </Navbar.Brand>
           {
            insideDashboard &&
            <div className='ms-auto'>
              <button className='btn text-danger fw-bold fs-5'><i class="fa-solid fa-gear"></i>Logout</button>
            </div>
          } 
        </Container>
      </Navbar>

    </>
  )
}

export default Header 