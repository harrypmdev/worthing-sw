import React from 'react';
import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'

function NavBar() {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand href="/">
            <img src={logo} width="300"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className={`mx-2 ${location.pathname == '/' ? styles.active : ''}`}>Home</Nav.Link>
            <Nav.Link href="#home" className={`mx-2 ${location.pathname == '/general-feed/' ? styles.active : ''}`}>General Feed</Nav.Link>
            <Nav.Link href="#home" className={`mx-2 ${location.pathname == '/login/' ? styles.active : ''}`}>Login</Nav.Link>
            <Nav.Link href="#home" className={`mx-2 ${location.pathname == '/register/' ? styles.active : ''}`}>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;