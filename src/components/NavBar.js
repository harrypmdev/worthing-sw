import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';

import logo from '../assets/logo.webp'
import styles from '../styles/NavBar.module.css'
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './profile/Avatar';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/utils';
import { toast } from 'react-toastify';


/**
 * Render the site's navigation bar, conditionally displaying links based on user login state.
 * 
 * @returns {ReactNode} - Am element displaying a responsive navigation bar containing site links and 
 *                        authentication-specific options.
 */
function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const {navExpanded, setNavExpanded, ref} = useClickOutsideToggle();

  const toggleNav = expanded => setNavExpanded(expanded);

  /**
   * Handle the 'Sign Out' button click.
   * Sends a POST request to log out the user, sets the 'currentUser' context
   * to null.
   * Removes the token timestamp from local storage.
   */
  const handleSignOut = async () => {
    try {
      await axios.post('/dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
      toast.success('Logged out!', {position: 'bottom-left'});
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Return the appropriate NavLink styling for the screen size and active state.
   * 
   * @param {boolean} isActive Whether the NavLink is currently active.
   * @returns {string} The relevant CSS styles.
   */
  const getRelevantClasses = ({isActive}) => (
    `${styles.NavLink} ${isActive 
      ? (navExpanded ? 'fw-bold' : styles.active)
      : ''
    }`
  );

  const loggedOut = <>
    <NavLink to="/" className={getRelevantClasses}>Home</NavLink>
    <NavLink to="/general-feed/" className={getRelevantClasses}>General Feed</NavLink>
    <NavLink to="/login/" className={getRelevantClasses}>Login</NavLink>
    <NavLink to="/register/" className={getRelevantClasses}>Register</NavLink>
  </>

  const loggedIn = <>
    <NavLink to="/create-post/" className={getRelevantClasses}>New Post</NavLink>
    <NavLink to="/my-feed/" className={getRelevantClasses}>My Feed</NavLink>
    <NavLink to="/general-feed/" className={getRelevantClasses}>General Feed</NavLink>
    <NavLink to="/" className={styles.NavLink} onClick={handleSignOut}>
      Logout
    </NavLink>
    <Avatar 
      image={currentUser?.profile_image} 
      username={currentUser?.username} 
      id={currentUser?.profile_id}
      dimensions={40}
      dark={true}
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
              className={styles.navbarLogo}
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