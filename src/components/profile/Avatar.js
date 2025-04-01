import React from 'react'
import { NavLink } from 'react-router-dom';

import styles from '../../styles/Avatar.module.css'


/**
 * Render a user avatar which functions as a link to their profile page
 * and displays their profile image and username.
 * 
 * @param {string} image The source link for the profile image.
 * @param {string} username The profile's username.
 * @param {string} id The id of the profile in question.
 * @param {number} [dimensions=45] The dimensions of the image in pixels for variable sizing.
 * @param {boolean} [dark=false] A boolean to determine whether the avatar should be dark coloured.
 * @returns {ReactNode} A clickable avatar element linking to the user's profile.
 */
const Avatar = (props) => {
  const { 
    image, 
    username,
    id,
    dimensions = 45,
    dark = false,
  } = props;

  const bgColor = dark ? 'dark' : 'secondary-subtle';
  const textColor = dark ? 'text-white' : 'text-dark';

  return (
    <NavLink 
      to={`/profile/${id}`}
      className={`bg-${bgColor} bg-gradient ${textColor} border
                 rounded ps-2 pe-3 py-2 d-inline-flex w-auto align-items-center 
                 text-decoration-none ${styles.Avatar}`}
    >
      <img 
        src={image} 
        height={dimensions}
        width={dimensions}
        alt="Avatar"
        className="rounded-circle m-0 object-fit-cover me-2"
      />
      {username && <span>{username}</span>}
    </ NavLink>
  );
};

export default Avatar;
