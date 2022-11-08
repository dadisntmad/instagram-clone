import React, { useEffect } from 'react';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { auth } from '../../firebase';
import { fetchUser, fetchUsers } from '../../redux/actions/user';
import { useSelector } from 'react-redux';
import { selectUser } from '../../selectors/selectors';
import { followUnfollow } from '../utils/methods';

import styles from './Suggestions.module.scss';

export const Suggestions: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user, users } = useSelector(selectUser);

  const currentUser = auth.currentUser?.uid;

  const signOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    dispatch(fetchUser(String(currentUser)));
  }, []);

  useEffect(() => {
    dispatch(fetchUsers(String(currentUser)));
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.user}>
        <Link to={`/${currentUser}`}>
          <div className={styles.userContent}>
            <ProfileImage size={64} imageUrl={user?.imageUrl} />
            <div>
              <p className={styles.username}>{user?.username}</p>
              <p className={styles.name}>{user?.fullName}</p>
            </div>
          </div>
        </Link>
        <button onClick={signOut}>Sign Out</button>
      </div>
      <div className={styles.suggestions}>
        <p>Suggestions For You</p>
        <Link to="/explore/people">
          <button>See All</button>
        </Link>
      </div>
      {users.slice(0, 5).map((user) => (
        <div className={styles.user} key={user.uid}>
          <Link to={`/${user.uid}`}>
            <div className={styles.userContent}>
              <ProfileImage size={40} imageUrl={user.imageUrl} />
              <div>
                <p className={styles.username}>{user.username}</p>
                <p className={styles.name}>{user.fullName}</p>
              </div>
            </div>
          </Link>
          <button onClick={() => followUnfollow(String(currentUser), user.uid)}>
            {user.isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      ))}
    </div>
  );
};
