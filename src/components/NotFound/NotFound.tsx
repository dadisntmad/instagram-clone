import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.root}>
      <h3>Sorry, this page isn't available.</h3>
      <p>
        The link you followed may be broken, or the page may have been removed.{' '}
        <Link to="/">Go back to Instagram.</Link>
      </p>
    </div>
  );
};

export default NotFound;
