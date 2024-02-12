import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/Images/login.png'
import { Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from '../Services/allAPI';
import { loginAPI } from '../Services/allAPI';
import Spinner from 'react-bootstrap/Spinner';
import { tokenAuthenticationContext } from '../Context API/TokenAuth';


function Auth({ insideRegister }) {

  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthenticationContext)

  const [loginStatus,setLoginStatus] = useState(false)

  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "", email: "", password: ""
  })
  console.log(userData);

  const handleRegister = async (e) => {
    e.preventDefault()
    console.log(userData);

    const { username, email, password } = userData
    if (!username || !email || !password) {
      toast.info("Please fill the form Completely!!!")
    } else {
      // toast.success("Proceed To API call...")
      try {
        const result = await registerAPI(userData)
        console.log(result);
        if (result.status === 200) {
          toast.success(`${result.data.username} has Registerd Successfully!!!`)
          setUserData({ username: "", email: "", password: "" })
          setTimeout(() => {
            navigate('/login')
          }, 3000)

        } else {

          toast.warning(result.response.data)

        }
      } catch (err) {
        console.log(err);
      }
    }

  }
  const handleLogin=async(e)=>{
    e.preventDefault()
    const { email, password } = userData
    if ( !email || !password) {
      toast.info("please fill the form completely")
    } else {
      try {
        const result = await loginAPI({email,password})
        console.log(result);
        if(result.status===200){
          setLoginStatus(true)
          sessionStorage.setItem("username",result.data.existingUser.username)
          sessionStorage.setItem("token",result.data.token)
          sessionStorage.setItem("userDetails",JSON.stringify(result.data.existingUser))
          setIsAuthorised(true)
          setTimeout(()=>{
            setUserData({email:"",password:""})
            navigate('/')
            setLoginStatus(false)
          },2000)
        }else{
          toast.warning(result.response.data)
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

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
                    <h1 style={{ fontSize: '41px' }} className='fw-bolder text-danger-
                emphasis'><i class="fa-solid fa-paperclip me-3 "></i>Project Fair</h1>
                    <h5 className='fw-bolder mt-2 pb-3'>
                      {insideRegister ? 'sign up to your Account' : 'Sign In to your Account'}
                    </h5>
                    <Form className='w-100'>
                      {
                        insideRegister && (<Form.Group className="mb-3" controlId="formBasicName">
                          <Form.Control type="text" placeholder="Enter Username" onChange={e => setUserData({ ...userData, username: e.target.value })} value={userData.username} />
                        </Form.Group>
                        )}
                      <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Control type="email" placeholder="Enter email" onChange={e => setUserData({ ...userData, email: e.target.value })} value={userData.email} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" onChange={e => setUserData({ ...userData, password: e.target.value })} value={userData.password} />
                      </Form.Group>
                      {
                        insideRegister ?
                          <div>
                            <button onClick={handleRegister} className='btn btn-light mb-2'>Register</button>
                            <p>Already have an Account? Click here to <Link to={'/login'}>Login</Link></p>
                          </div> :
                          <div>
                            <button onClick={handleLogin} className='btn btn-light mb-2'>Login {loginStatus&&<Spinner animation="border" variant="danger" />} </button>
                            
                            <p>New User? Click here to <Link to={'/register'}>Register</Link></p>
                          </div>
                      }
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ToastContainer autoClose={3000} theme='colored' />

        </div>
      )
    }

    export default Auth