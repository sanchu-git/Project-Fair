import React from 'react'
import { Link } from 'react-router-dom'
import loginImg from '../assets/Images/login.png'
import { Form } from 'react-bootstrap'
function Auth({ insideRegister }) {
  return (
    <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <div className="container w-75">
        <Link to={'/'}> <i class="fa-solid fa-arrow-left"></i>Back to Home</Link>
        <div className="card shadow p-5" style={{ background: 'greenyellow' }}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src={loginImg} alt="" />
            </div>
            <div className="col-lg-6">
              <div className='d-flex align-items-center flex-column'>
                <h1 style={{ fontSize: '41px' }} className='fw-bolder text-danger-emphasis'><i class="fa-solid fa-paperclip me-3 "></i>Project Fair</h1>
                <h5 className='fw-bolder mt-2 pb-3'>
                  {insideRegister ? 'sign up to your Account' : 'Sign In to your Account'}
                </h5>
                <Form className='w-100'>
                  {
                    insideRegister && (<Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Control type="email" placeholder="Enter Username" />
                    </Form.Group>
                    )}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  {
                    insideRegister ?
                      <div>
                        <button className='btn btn-light mb-2'>Register</button>
                        <p>Already have an Account? Click here to <Link to={'/login'}>Login</Link></p>
                      </div> :
                      <div>
                        <button className='btn btn-light mb-2'>Login</button>
                        <p>New User? Click here to <Link to={'/register'}>Register</Link></p>
                      </div>
                  }
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth