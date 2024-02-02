import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Myproject from '../Components/MyProject'
import Profile from '../Components/Profile'
function Dashboard() {
  const [userName,setUserName] = useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("username")){
      setUserName(sessionStorage.getItem("username"))
    }else{
      setUserName("")
    }
  },[])
  return (
    <>
    <Header insideDashboard/>
    <div style={{marginTop:'60px'}} className='dashboard container'>
      <h1 className='fw-bolder'>Welcome <span className='text-warning'>{userName}</span></h1>
    <div className="row mt-5">
      <div className="col-lg-8">
        <Myproject/>
      </div>
      <div className="col-lg-4">
        <Profile/>
      </div>
    </div>
    </div>
    </>
  )
}

export default Dashboard