import React from 'react';
import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../assets/logo.webp'
import styles from '../styles/NavBar.module.css'

function NavBar() {
  const location = useLocation();
  const [navExpanded, setNavExpanded] = React.useState(false);

  function toggleNav(expanded) {
    setNavExpanded(expanded);
  }

  const getActive = () => navExpanded ? 'fw-bold' : styles.active;

  return (
    <Navbar 
      expand="lg" 
      className="bg-body-tertiary" 
      sticky="top"
      onToggle={toggleNav}
      expanded={navExpanded}
    >
      <Container>
        <Navbar.Brand href="/">
            <img alt="Worthing Sound Wave" src={logo} width="300" height="56"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className={`mx-2 ${location.pathname === '/' ? getActive() : ''}`}>Home</Nav.Link>
            <Nav.Link href="" className={`mx-2 ${location.pathname === '/general-feed/' ? getActive() : ''}`}>General Feed</Nav.Link>
            <Nav.Link href="/login/" className={`mx-2 ${location.pathname === '/login/' ? getActive() : ''}`}>Login</Nav.Link>
            <Nav.Link href="/register/" className={`mx-2 ${location.pathname === '/register/' ? getActive() : ''}`}>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;