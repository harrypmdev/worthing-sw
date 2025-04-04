import React from 'react';
import { Spinner } from 'react-bootstrap';

import styles from '../../styles/ComponentSpinner.module.css';

/**
 * Return a spinner appropriate for loading components which make
 * up just part of a page.
 * For a spinner to easily use to fill a whole page, use 'FullPageSpinner'.
 * 
 * @returns {ReactNode} - An element displaying a loading spinner.
 */
const ComponentSpinner = () => {
  return (
    <div className={`${styles.componentSpinner} p-4`}>
      <Spinner animation='border' />
    </div>
  );
};

export default ComponentSpinner;
