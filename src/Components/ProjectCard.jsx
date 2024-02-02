import React , {useState} from 'react'
import { Card, Col, Modal, Row} from 'react-bootstrap'
function ProjectCard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
          <Card style={{width:'28rem'}} className='shadow btn mb-5' onClick={handleShow}>
      <Card.Img width={'100%'} variant="top" src="https://static.javatpoint.com/definition/images/program-definition2.png" />
      <Card.Body>
        <Card.Title style={{height:'28px'}}>Card Title</Card.Title>
      </Card.Body>
    </Card>
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img className='img-fluid' style={{height:'250px'}} src="https://static.javatpoint.com/definition/images/program-definition2.png" alt="" />
            </Col>
            <Col md={6}>
              <h2 className='fw-bolder text-dark'>Project Title</h2>
              <p>Project Overview : <span className='fw-bolder' style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel explicabo accusamus atque nam voluptates inventore praesentium ad labore nemo, quae magni a quisquam officiis, ipsa, iste eveniet distinctio quos iure!</span></p>
              <p>Language Used: <span className='fw-bolder text-danger'>HTML,JS,CSS</span></p>
            </Col>
          </Row>
          <div>
            <a href="https://github.com/sanchu-git/Project-Fair" target='_blank' className='btn me-3'><i style={{height:'40px'}} className="fa-brands fa-github fa-2x"></i> </a>
            <a href="https://project-fair-vert.vercel.app/" target='_blank' className='btn me-3'><i style={{height:'40px'}} className="fa-solid fa-link fa-2x"></i> </a>

          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard