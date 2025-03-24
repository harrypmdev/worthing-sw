import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';

import logo from '../assets/logo.webp'
import styles from '../styles/NavBar.module.css'
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/utils';


function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const {navExpanded, setNavExpanded, ref} = useClickOutsideToggle();

  function toggleNav(expanded) {
    setNavExpanded(expanded);
  }

  const handleSignOut = async () => {
    console.log("function triggers at all");
    try {
      await axios.post('/dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

  const getRelevantClasses = ({isActive}) => (
    `${styles.NavLink} ${isActive ? getActive() : ''}`
  );

  const getActive = () => navExpanded ? 'fw-bold' : styles.active;

  const loggedOut = <>
    <NavLink to="/" className={getRelevantClasses}>Home</NavLink>
    <NavLink to="/general-feed/" className={getRelevantClasses}>General Feed</NavLink>
    <NavLink to="/login/" className={getRelevantClasses}>Login</NavLink>
    <NavLink to="/register/" className={getRelevantClasses}>Register</NavLink>
  </>

  const loggedIn = <>
    <NavLink to="/new-post/" className={getRelevantClasses}>New Post</NavLink>
    <NavLink to="/my-feed/" className={getRelevantClasses}>My Feed</NavLink>
    <NavLink to="/general-feed/" className={getRelevantClasses}>General Feed</NavLink>
    <NavLink to="/" className={styles.NavLink} onClick={handleSignOut}>
      Logout
    </NavLink>
    <Avatar 
      src={currentUser?.profile_image} 
      text={currentUser?.username} 
      height={40}
      to={`/profile/${currentUser?.profile_id}`}
    />
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
        <Navbar.Toggle ref={ref} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='ms-auto align-items-lg-center'>
            {currentUser ? loggedIn : loggedOut}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;