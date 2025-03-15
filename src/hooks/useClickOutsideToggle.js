import React, { useEffect, useRef } from 'react';

const useClickOutsideToggle = () => {
  const [navExpanded, setNavExpanded] = React.useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setNavExpanded(false);
      }
    }
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    }
  }, [ref]);
  return {navExpanded, setNavExpanded, ref };
}

export default useClickOutsideToggle
