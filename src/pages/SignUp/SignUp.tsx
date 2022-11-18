import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../selectors/selectors';
import { setEmail, setFullName, setPassword, setUsername } from '../../redux/slices/auth';
import { auth, db } from '../../firebase';
import { User } from '../../types/user';
import { RotatingLines } from 'react-loader-spinner';
import cn from 'classnames';

import logo from '../../assets/logo.png';

import styles from './SignUp.module.scss';

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { email, fullName, username, password } = useSelector(selectAuth);

  const isValid = email && fullName && username && password;

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const onFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFullName(e.target.value));
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };

  const signUp = () => {
    setIsLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const data: User = {
          uid: String(userCredential.user?.uid),
          email,
          fullName,
          username,
          imageUrl: '',
          isFollowing: false,
          following: [],
          followers: [],
        };

        db.collection('users').doc(userCredential.user?.uid).set(data);
        navigate('/');
        setIsLoading(false);
        dispatch(setEmail(''));
        dispatch(setFullName(''));
        dispatch(setUsername(''));
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
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={onFullNameChange}
            />
          </div>
          <div>
            <input
              className={styles.formInput}
              type="text"
              placeholder="Username"
              value={username.toLowerCase()}
              onChange={onUsernameChange}
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
                [styles.disabled]: isLoading,
              })}
              disabled={!isValid}
              onClick={signUp}>
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="3"
                  animationDuration="0.75"
                  width="22"
                  visible={true}
                />
              ) : (
                'Sign up'
              )}
            </button>
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

export default SignUp;
