import React, { useContext, useEffect, useState } from 'react'
import { Button,Modal } from 'react-bootstrap'
import uploadImg from '../assets/Images/upload.png'
import { SERVER_URL } from '../Services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectAPI } from '../Services/allAPI';
import { EditProjectResponseContext } from '../Context API/ContextShare';


function EditProject({project}) {
  
  const {EditProjectResponse,setEditProjectResponse} = useContext(EditProjectResponseContext)


  console.log(project);

  const [projectData, setProjectData] = useState({
   id:project._id,  title:project.title, languages:project.languages, overview:project.overview, github:project.github, website:project.website, projectImage:""
  })

  const [preview,setPreview] = useState("")
  
  useEffect(()=>{
    if(projectData.projectImage){
      setPreview(URL.createObjectURL(projectData.projectImage))
    }else{
      setPreview("")
    }
  },[projectData.projectImage])

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setProjectData({
      id:project._id,  title:project.title, languages:project.languages, overview:project.overview, github:project.github, website:project.website, projectImage:""
    })
    setPreview("")
  }

  const handleUpdate = async ()=>{
    const {id, title, languages, website, github, overview} = projectData

    if (!title || !languages || !overview || !github || !website) {
      toast.info("Please Fill the Form Completely!!!")
    } else{
              // API CALL - REQBODY

      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("languages", languages)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      preview?reqBody.append("projectImage", projectImage):reqBody.append("projectImage",project.projectImage)

      // Api call - reqHeader

      const token = sessionStorage.getItem("token")
      console.log(token);
      if(token){
          const reqHeader = {
            "Content-Type": preview?"multipart/form-data":"application/json",
            "Authorization": `Bearer ${token}`
          }
          // API CALL
          try{
            const result = await editProjectAPI(id,reqBody,reqHeader)
            console.log(result);
            if(result.status===200){
              // toast.success(`project "${result.data.title}" updated successfully...`)
              handleClose()
              setEditProjectResponse(result.data)
            }else{
              toast.danger(result.response.data)

            }
          }catch (err){
            console.log(err);
          }
        
      }
    }
  }


  return (
    <>
          <Button onClick={handleShow} variant=""><i class="fa-solid fa-pen-to-square fa-2x"></i></Button>{' '}

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
              <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
              <img width={'100%'} height={'300px'} src={preview?preview:`${SERVER_URL}/uploads/${project.projectImage}`} alt="Upload Project Image" />
            </label>
          </div>
          <div className="col-lg-6">
          <div className="mb-3">
                <input type="text" onChange={e=>setProjectData({...projectData,title:e.target.value})} className='form-control' placeholder='Project Title' value={projectData.title} />
              </div>
              <div className="mb-3">
                <input type="text"  onChange={e=>setProjectData({...projectData,languages:e.target.value})} className='form-control' placeholder='Language Used'  value={projectData.languages} />
              </div>
              <div className="mb-3">
                <input type="text"  onChange={e=>setProjectData({...projectData,github:e.target.value})} className='form-control' placeholder='Project Github Link'  value={projectData.github}/>
              </div>
              <div className="mb-3">
                <input type="text"  onChange={e=>setProjectData({...projectData,website:e.target.value})} className='form-control' placeholder='Project Website Link'  value={projectData.website}/>
              </div>
              <div className="mb-3">
                <input type="text"  onChange={e=>setProjectData({...projectData,overview:e.target.value})} className='form-control' placeholder='Project Overview'  value={projectData.overview} />
              </div>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="success">Update</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer autoClose={3000} theme='colored' />

    </>
  )
}

export default EditProject