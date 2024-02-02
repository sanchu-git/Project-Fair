import React, { useState } from 'react'
import { Collapse,Button } from 'react-bootstrap'
import ProfileImg from '../assets/Images/profile.png'

function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="d-flex rounded p2 justify-content-between">
        <h2>Profile</h2>
        <button onClick={() => setOpen(!open)} className='btn btn-outline-warning'><i className="fa-solid fa-chevron-down"></i></button>
      </div>
      <Collapse in={open}>
        <div className='row shadow p-5 justify-content-center mt-5' id="example-collapse-text">
          <label className='text-center'>
            <input className='rounded' style={{ display: 'none' }} type="file" />
            <img width={'200px'} height={'200px'} src={ProfileImg} alt="Uploaded image" />
          </label>
          <div>        
            <input placeholder='Enter your Github URL' type="text" className='form-control mt-3' /></div>
          <div>
            <input placeholder='Enter your Linkedin URL' type="text" className='form-control mt-3' /></div>
            <Button className='mt-3' variant="outline-warning">Update</Button>{' '}
        </div>
      </Collapse>
    </>
  )
}

export default Profile