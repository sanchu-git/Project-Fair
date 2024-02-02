import React, { useState } from 'react'
import { Button,Modal } from 'react-bootstrap'
import uploadImg from '../assets/Images/upload.png'
function EditProject() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
              <input type="file" style={{display:'none'}} />
              <img width={'100%'} height={'300px'} src={uploadImg} alt="Upload Project Image" />
            </label>
          </div>
          <div className="col-lg-6">
          <div className="mb-3">
                <input type="text" className='form-control' placeholder='Project Title' />
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Language Used' />
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Project Github Link' />
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Project Website Link' />
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Project Overview' />
              </div>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success">Add</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default EditProject