import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

import styles from './SignIn.module.scss';

export const SignIn: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.form}>
          <div>
            <input className={styles.formInput} type="text" placeholder="Email" />
          </div>
          <div>
            <input className={styles.formInput} type="password" placeholder="Password" />
          </div>
          <div>
            <button className={styles.formButton}>Log In</button>
          </div>
        </div>
      </div>
      <div className={styles.navigation}>
        <div className={styles.navigationContent}>
          <p>Don't have an account? </p>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
