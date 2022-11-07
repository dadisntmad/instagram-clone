import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { fetchUsers } from '../../redux/actions/user';
import { useAppDispatch } from '../../redux/store';
import { selectUser } from '../../selectors/selectors';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { followUser, unfollowUser } from '../utils/methods';

import styles from './People.module.scss';

export const People: React.FC = () => {
  const dispatch = useAppDispatch();

  const { users } = useSelector(selectUser);

  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    dispatch(fetchUsers(String(currentUser)));
  }, []);

  const follow = (uid: string, followId: string) => () => {
    followUser(uid, followId);
  };

  const unfollow = (uid: string, followId: string) => () => {
    unfollowUser(uid, followId);
  };

  return (
    <div className={styles.root}>
      <h4>Suggested</h4>
      <div className={styles.content}>
        {users.map((user) => (
          <div className={styles.user} key={user.uid}>
            <Link to={`/${user.uid}`}>
              <div className={styles.userContent}>
                <ProfileImage size={45} imageUrl={user.imageUrl} />
                <div>
                  <p className={styles.username}>{user.username}</p>
                  <p className={styles.name}>{user.fullName}</p>
                </div>
              </div>
            </Link>
            <button
              onClick={
                user.isFollowing
                  ? unfollow(String(currentUser), user.uid)
                  : follow(String(currentUser), user.uid)
              }>
              {user.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
