import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/**
 * Render the Page Not Found page, with an explanation message and a button to return home.
 * 
 * @returns {ReactNode} - An element displaying the full Page Not Found page.
 */
const PageNotFound = () => {
  return (
    <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className='fw-bold'>Page not found <i className="ms-1 fa-solid fa-xl fa-circle-exclamation"></i></h1>
      <p className='mt-2'>Sorry, looks like this page doesn't exist. Maybe you're looking for something a user deleted.</p>
      <Row>
        <Col>
        <Link to='/'>
          <Button variant="primary" className='mt-1'>Take Me Home</Button>
        </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default PageNotFound
