import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../selectors/selectors';
import { setEmail, setPassword } from '../../redux/slices/auth';
import { auth } from '../../firebase';
import { RotatingLines } from 'react-loader-spinner';
import cn from 'classnames';

import logo from '../../assets/logo.png';

import styles from './SignIn.module.scss';

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = useSelector(selectAuth);

  const isValid = email && password;

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };

  const signIn = () => {
    setIsLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setIsLoading(false);
        dispatch(setEmail(''));
        dispatch(setPassword(''));
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
            <button
              className={cn(styles.formButton, {
                [styles.disabled]: !isValid,
              })}
              disabled={!isValid || isLoading}
              onClick={signIn}>
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="3"
                  animationDuration="0.75"
                  width="22"
                  visible={true}
                />
              ) : (
                'Log In'
              )}
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

export default SignIn;
