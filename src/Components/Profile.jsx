import React, { useEffect, useState } from 'react'
import { Collapse, Button } from 'react-bootstrap'
import ProfileImg from '../assets/Images/profile.png'
import { SERVER_URL } from '../Services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileAPI } from '../Services/allAPI';

function Profile() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: "", password: "", email: "", github: "", linkedin: "", profileImage: ""
  })
  const [existingImage, setExistingImage] = useState("")
  const [preview, setPreview] = useState("")
  useEffect(() => {
    if (sessionStorage.getItem("userDetails")) {
      const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
      setUserData({ ...userData, username: userDetails.username, password: userDetails.password, email: userDetails.email, github: userDetails.github, linkedin: userDetails.linkedin })
      setExistingImage(userDetails.Profile)
    }
  }, [open])

  useEffect(() => {
    if (userData.profileImage) {
      setPreview(URL.createObjectURL(userData.profileImage))
    } else {
      setPreview(ProfileImg)
    }

  }, [userData.profileImage])
  console.log(userData);

  const handleProfileUpdate = async () => {
    const { username, password, email, github, linkedin, profileImage } = userData
    if (!github || !linkedin) {
      toast.info("Please Fill The form Completely!!!")
    } else {
      // Proceed to apii call
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("password", password)
      reqBody.append("email", email)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append("profileImage", profileImage) : reqBody.append("profileImage", existingImage)

      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }
        // api call
        try{
          const result = await updateUserProfileAPI(reqBody,reqHeader)
          if(result.status==200){
            setOpen(!open)
            sessionStorage.setItem("userDetails",JSON.stringify(result.data))
          }else{
            console.log(result);
          }
        }catch(err){
          console.log(err);
        }
      }
    }
  }

  return (
    <>
      <div className="d-flex rounded p2 justify-content-between">
        <h2>Profile</h2>
        <button onClick={() => setOpen(!open)} className='btn btn-outline-warning'><i className="fa-solid fa-chevron-down"></i></button>
      </div>
      <Collapse in={open}>
        <div className='row shadow p-5 justify-content-center mt-5' id="example-collapse-text">
          <label className='text-center'>
            <input className='rounded' style={{ display: 'none' }} type="file" onChange={e => setUserData({ ...userData, profileImage: e.target.files[0] })} />
            {existingImage == "" ? <img width={'200px'} height={'200px'} src={preview ? preview : ProfileImg} alt="Uploaded image" />
              :
              <img width={'200px'} height={'200px'} src={preview ? preview : `${SERVER_URL}/uploads/${existingImage}`} alt="Uploaded image" />
            }
          </label>
          <div>
            <input placeholder='Enter your Github URL' type="text" className='form-control mt-3' value={userData.github} onChange={e => setUserData({ ...userData, github: e.target.value })} /></div>
          <div>
            <input placeholder='Enter your Linkedin URL' type="text" className='form-control mt-3' value={userData.linkedin} onChange={e => setUserData({ ...userData, linkedin: e.target.value })} /></div>
          <Button onClick={handleProfileUpdate} className='mt-3' variant="outline-warning">Update</Button>{' '}
        </div>
      </Collapse>
      <ToastContainer autoClose={3000} theme='colored' />

    </>
  )
}

export default Profile