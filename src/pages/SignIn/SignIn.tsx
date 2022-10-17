import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../selectors/selectors';
import { setEmail, setPassword } from '../../redux/slices/auth';
import { auth } from '../../firebase';

import logo from '../../assets/logo.png';

import styles from './SignIn.module.scss';

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const { email, password } = useSelector(selectAuth);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(`${userCredential.user?.uid} is authenticated`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.form}>
          <div>
            <input
              className={styles.formInput}
              type="text"
              placeholder="Email"
              value={email}
              onChange={onEmailChange}
            />
          </div>
          <div>
            <input
              className={styles.formInput}
              type="password"
              placeholder="Password"
              value={password}
              onChange={onPasswordChange}
            />
          </div>
          <div>
            <button className={styles.formButton} onClick={signIn}>
              Log In
            </button>
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
