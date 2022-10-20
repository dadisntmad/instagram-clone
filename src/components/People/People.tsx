import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { setUsers } from '../../redux/slices/user';
import { useAppDispatch } from '../../redux/store';
import { selectUser } from '../../selectors/selectors';
import { ProfileImage } from '../ProfileImage/ProfileImage';

import styles from './People.module.scss';

export const People = () => {
  const dispatch = useAppDispatch();

  const { users } = useSelector(selectUser);

  useEffect(() => {
    const fetchUsers = () => {
      db.collection('users')
        .get()
        .then((querySnapshot) => {
          dispatch(
            setUsers(
              querySnapshot.docs.map((doc) => ({
                uid: doc.id,
                email: doc.data()?.email,
                fullName: doc.data()?.fullName,
                username: doc.data()?.username,
                imageUrl: doc.data()?.imageUrl,
                bio: doc.data()?.bio,
                followers: doc.data()?.followers,
                following: doc.data()?.following,
              })),
            ),
          );
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchUsers();
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
