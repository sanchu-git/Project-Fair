import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadImg from '../assets/Images/upload.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../Services/allAPI';

function AddProject() {
  const [preview, setPreview] = useState("")
  const [fileStatus, setFileStatus] = useState(false)
  const [show, setShow] = useState(false);
  const [projectData, setProjectData] = useState({
    title: "", languages: "", overview: "", github: "", website: "", projectImage: ""
  })

  console.log(projectData);



  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setProjectData({
      title: "", languages: "", overview: "", github: "", website: "", projectImage: ""
    })
    setPreview("")
  }

  useEffect(() => {
    if (projectData.projectImage.type == "image/png" || projectData.projectImage.type == "image/jpg" || projectData.projectImage.type == "image/jpeg") {
      console.log("Generate Image URL");
      setPreview(URL.createObjectURL(projectData.projectImage))
      setFileStatus(false)
    } else {
      console.log("Please upload  files with following extensions (png, jpg, jpeg) Only");
      setFileStatus(true)
      setPreview("")
      setProjectData({ ...projectData, projectImage: "" })
    }
  }, [projectData.projectImage])

  const handleAddProject = async () => {
    const { title, languages, website, github, overview, projectImage } = projectData
    if (!title || !languages || !overview || !github || !website || !projectImage) {
      toast.info("Please Fill the Form Completely!!!")
    } else {
      // API CALL - REQBODY

      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("languages", languages)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("projectImage", projectImage)

      // Api call Header

      const token = sessionStorage.getItem("token")
      console.log(token);
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        // API CALL
        try {
          const result = await addProjectAPI(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            console.log(result.data);
            handleClose()

          } else {
            toast.warning(result.response.data)
          }
        } catch (err) {
          console.log(result);
        }
      }
    }
  }

  return (
    <>
      <Button onClick={handleShow} variant="success"><i className="fa-solid fa-plus me-1"></i> Add Project</Button>{' '}

      <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <label >
                <input type="file" style={{ display: 'none' }} onChange={e => setProjectData({ ...projectData, projectImage: e.target.files[0] })} />
                <img width={'100%'} height={'300px'} src={preview ? preview : uploadImg} alt="Upload Project Image" />
              </label>
              {fileStatus && <div className="text-danger mt-2 fw-bolder">*Please upload  files with following extensions (png, jpg, jpeg) Only* </div>}
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Project Title' value={projectData.title}
                  onChange={e => setProjectData({ ...projectData, title: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Language Used' value={projectData.languages}
                  onChange={e => setProjectData({ ...projectData, languages: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Project Github Link' value={projectData.github}
                  onChange={e => setProjectData({ ...projectData, github: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Project Website Link' value={projectData.website}
                  onChange={e => setProjectData({ ...projectData, website: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Project Overview' value={projectData.overview}
                  onChange={e => setProjectData({ ...projectData, overview: e.target.value })} />
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddProject} variant="success">Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer autoClose={3000} theme='colored' />

    </>
  )
}

export default AddProject