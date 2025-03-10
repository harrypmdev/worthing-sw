import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import homeImage from '../assets/home-image.webp';

const Home = () => {
  return (
    <Container className="flex-grow-1 d-flex flex-column">
        <Row className="d-flex flex-grow-1 align-items-center pb-6">
            <Col className='col-6 text-center'>
                <h1 className="h2 mb-3">Worthing's Music Hub</h1>
                <p className="mb-4">
                Worthing Sound Wave is a site for local Worthing musicians to discuss music,
                collaborate or share new tracks. You can find bandmates, emerging artists and events.
                </p>
                <Button variant="primary me-3">Register</Button>
                <Button variant="secondary ms-3">See What's On</Button>
            </Col>
            <Col className='col-6 text-center'>
              <Image fluid rounded src={homeImage}/>
            </Col>
        </Row>
    </Container>
  )
}

export default Home
