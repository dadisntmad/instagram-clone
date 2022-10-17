import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

import styles from './SignUp.module.scss';

export const SignUp: React.FC = () => {
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
            <input className={styles.formInput} type="text" placeholder="Full Name" />
          </div>
          <div>
            <input className={styles.formInput} type="text" placeholder="Username" />
          </div>
          <div>
            <input className={styles.formInput} type="password" placeholder="Password" />
          </div>
          <div>
            <button className={styles.formButton}>Sign up</button>
          </div>
        </div>
      </div>
      <div className={styles.navigation}>
        <div className={styles.navigationContent}>
          <p>Have an account? </p>
          <Link to="/">
            <button> Log in</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
