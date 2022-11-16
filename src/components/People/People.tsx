import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { fetchUsers } from '../../redux/actions/user';
import { useAppDispatch } from '../../redux/store';
import { selectPost, selectUser } from '../../selectors/selectors';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { followUnfollow } from '../../utils/methods';

import styles from './People.module.scss';

export const People: React.FC = () => {
  const dispatch = useAppDispatch();

  const { users } = useSelector(selectUser);
  const { posts } = useSelector(selectPost);

  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    dispatch(fetchUsers(String(currentUser)));
  }, []);

  return (
    <div className={styles.root}>
      <h4>Suggested</h4>
      <div className={styles.content}>
        {users &&
          users.map((user) => (
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
              <button onClick={() => followUnfollow(String(currentUser), user.uid, posts)}>
                {user.isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
