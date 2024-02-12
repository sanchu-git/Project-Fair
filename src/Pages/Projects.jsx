import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { getAllProjectAPI } from '../Services/allAPI'

function Projects() {

  const [searchKey,setSearchKey] = useState("")

  const [allProjects, setAllProjects] = useState([])

  const getAllProjects = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      const result = await getAllProjectAPI(searchKey,reqHeader)
      if (result.status === 200) {
        setAllProjects(result.data)
      } else {
        console.log(result);
      }
    }

  }
  console.log(allProjects);
  useEffect(() => {
    getAllProjects()
  }, [searchKey])


  return (
    <>
      <Header />
      <div style={{ marginTop: '100px' }} className='project-page-design'>
        <div className="d-flex justify-content-between m-5">
          <h1 className='ms-5'>All Projects</h1>
          <input onChange={e=>setSearchKey(e.target.value)} style={{ width: '300px' }} className='form-control' type="text" placeholder='Search Projects By Language Used' />
        </div>
        <Row className='mt-5 container-fluid'>
          {allProjects?.length > 0 ? allProjects.map((project,index)=>(
            <Col key={index} sm={12} md={6} lg={4}>
            <ProjectCard project={project}/>
          </Col> 
          )) :
            <div className='text-danger fs-4 fw-bolder ms-3'>Nothing To Display!!!</div>
          }
        </Row>
      </div>

    </>
  )
}

export default Projects