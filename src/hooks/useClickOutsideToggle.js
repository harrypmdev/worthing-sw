import React, { useEffect, useRef } from 'react';

/**
 * A hook to track mouse clicks outside of a particular DOM element and set 
 * a returned state variable (navExpanded) to false if the user clicks outside of it.
 * 
 * @returns {Object} An object containing:
 *                   1) navExpanded - Whether or not the navbar should
 *                   currently be expanded.
 *                   2) setNavExpanded - The setter for 'navExpanded' so
 *                   additional functionality can be added, such as setting
 *                   'navExpanded' with the clicking of the burger icon.
 *                   3) ref - A reference that should be given to the 'ref'
 *                   attribute of the DOM element the hook should track.
 */
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
  return {navExpanded, setNavExpanded, ref};
}

export default useClickOutsideToggle
