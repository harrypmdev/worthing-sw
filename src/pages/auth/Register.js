import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import registerImage from '../../assets/register-image.webp';
import styles from '../../styles/Register.module.css';


function Register() {
    return (
      <Container className="flex-grow-1 d-flex flex-column">
        <Row className="d-flex flex-grow-1 align-items-center pb-6">
          <Col xs="12" md="6" className="text-center d-none d-md-block">
            <Image fluid rounded src={registerImage} className={styles.registerImage} />
          </Col>
          <Col xs="12" md="6" className="text-center">
            <h1 className="h2 mb-3">Worthing's Music Hub</h1>
            <p className="mb-4">
              Worthing Sound Wave is a site for local Worthing musicians to discuss music,
              collaborate, or share new tracks. You can find bandmates, emerging artists, and events.
            </p>
          </Col>
        </Row>
      </Container>
    );
}

export default Register
