import React, { useEffect } from 'react';
import { ProfileImage } from '../../components/ProfileImage/ProfileImage';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { fetchUser } from '../../redux/actions/user';
import { useAppDispatch } from '../../redux/store';
import { selectUser } from '../../selectors/selectors';

import styles from './EditAccount.module.scss';

export const EditAccount = () => {
  const dispatch = useAppDispatch();

  const { user } = useSelector(selectUser);

  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    dispatch(fetchUser(String(currentUser)));
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.edit}>
        <div className={styles.profile}>
          <ProfileImage size={40} imageUrl={user.imageUrl} />
          <div>
            <p>{user.username}</p>
            <button>Change profile photo</button>
            <input type="file" hidden />
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.formField}>
            <input type="text" placeholder="Name" />
          </div>
          <div className={styles.formField}>
            <input type="text" placeholder="Username" />
          </div>
          <button className={styles.submitButton}>Submit</button>
        </div>
      </div>
    </div>
  );
};
