import React from 'react'
import { Link } from 'react-router-dom';

import styles from '../styles/Avatar.module.css'

const Avatar = ({ src, height = 45, text, to = '/' }) => {
  return (
    <Link 
      to={to} 
      className={`bg-dark bg-gradient text-white
                 rounded ps-2 pe-3 py-2 d-flex align-items-center 
                 text-decoration-none ${styles.Avatar}`}
    >
      <img 
        src={src} 
        height={height}
        width={height}
        alt="Avatar"
        className="rounded-circle m-0 object-fit-cover me-2"
      />
      {text && <span>{text}</span>}
    </Link>
  );
};

export default Avatar;
