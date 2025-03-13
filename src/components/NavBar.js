import React from 'react';
import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../assets/logo.webp'
import styles from '../styles/NavBar.module.css'
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';

function NavBar() {
  const currentUser = useCurrentUser();
  const location = useLocation();
  const [navExpanded, setNavExpanded] = React.useState(false);

  function toggleNav(expanded) {
    setNavExpanded(expanded);
  }

  const getActive = () => navExpanded ? 'fw-bold' : styles.active;

  const loggedOut = <>
    <Nav.Link href="/" className={`mx-2 ${location.pathname === '/' ? getActive() : ''}`}>Home</Nav.Link>
    <Nav.Link href="" className={`mx-2 ${location.pathname === '/general-feed/' ? getActive() : ''}`}>General Feed</Nav.Link>
    <Nav.Link href="/login/" className={`mx-2 ${location.pathname === '/login/' ? getActive() : ''}`}>Login</Nav.Link>
    <Nav.Link href="/register/" className={`mx-2 ${location.pathname === '/register/' ? getActive() : ''}`}>Register</Nav.Link>
  </>

  const loggedIn = <>
    <Nav.Link href="" className={`mx-2 ${location.pathname === '/new-post/' ? getActive() : ''}`}>New Post</Nav.Link>
    <Nav.Link href="" className={`mx-2 ${location.pathname === '/my-feed/' ? getActive() : ''}`}>My Feed</Nav.Link>
    <Nav.Link href="" className={`mx-2 ${location.pathname === '/general-feed/' ? getActive() : ''}`}>General Feed</Nav.Link>
    <Nav.Link href="" className={`mx-2 ${location.pathname === '/logout/' ? getActive() : ''}`}>Logout</Nav.Link>
    <Avatar src={currentUser?.profile_image} text={currentUser?.profile_image} height={40} />
    {console.log(currentUser)}
  </>

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
            <img 
              alt="Worthing Sound Wave" 
              src={logo} 
              width="265"
              height="50"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {currentUser ? loggedIn : loggedOut}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;