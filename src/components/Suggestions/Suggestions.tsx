import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { followUnfollow } from '../../utils/methods';
import { auth } from '../../firebase';
import { useAppDispatch } from '../../redux/store';

import { fetchUser, fetchUsers } from '../../redux/actions/user';

import { selectPost, selectUser } from '../../selectors/selectors';
import { ProfileImage } from '../ProfileImage/ProfileImage';

import styles from './Suggestions.module.scss';

export const Suggestions: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user, users } = useSelector(selectUser);
  const { posts } = useSelector(selectPost);

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
      {users &&
        users.slice(0, 5).map((user) => (
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
            <button onClick={() => followUnfollow(String(currentUser), user.uid, posts)}>
              {user.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        ))}
    </div>
  );
};
