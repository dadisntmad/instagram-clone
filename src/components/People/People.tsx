import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { fetchUsers } from '../../redux/actions/user';
import { useAppDispatch } from '../../redux/store';
import { selectUser } from '../../selectors/selectors';
import { ProfileImage } from '../ProfileImage/ProfileImage';

import styles from './People.module.scss';

export const People: React.FC = () => {
  const dispatch = useAppDispatch();

  const { users } = useSelector(selectUser);

  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    dispatch(fetchUsers(String(currentUser)));
  }, []);

  return (
    <div className={styles.root}>
      <h4>Suggested</h4>
      <div className={styles.content}>
        {users.map((user) => (
          <div className={styles.user} key={user.uid}>
            <div className={styles.userContent}>
              <ProfileImage size={45} imageUrl={user.imageUrl} />
              <div>
                <p className={styles.username}>{user.username}</p>
                <p className={styles.name}>{user.bio}</p>
              </div>
            </div>
            <button>Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
};
