import React, { useEffect } from 'react';
import { ProfileImage } from '../../components/ProfileImage/ProfileImage';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectPost, selectUser } from '../../selectors/selectors';
import { auth } from '../../firebase';

import styles from './Profile.module.scss';
import { UserPost } from '../../components/UserPost/UserPost';
import { fetchUser } from '../../redux/actions/user';
import { fetchUserPosts } from '../../redux/actions/post';

export const Profile: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useSelector(selectUser);
  const { posts } = useSelector(selectPost);

  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    dispatch(fetchUser(String(currentUser)));
  }, []);

  useEffect(() => {
    dispatch(fetchUserPosts(String(currentUser)));
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.root}>
        <div className={styles.profileHeader}>
          <ProfileImage size={150} imageUrl={user.imageUrl} />
          <div>
            <div className={styles.profileContent}>
              <p>{user?.username}</p>
              {currentUser ? (
                <button className={styles.profileContentButton}>Edit profile</button>
              ) : (
                <div className={styles.profileContentButtons}>
                  <button className={styles.profileContentButton}>Message</button>
                  <button className={styles.profileContentFollow}>Follow</button>
                </div>
              )}
            </div>
            <div className={styles.statistics}>
              <p>
                <span>{posts.length}</span>{' '}
                {posts.length > 1 || posts.length === 0 ? 'posts' : 'post'}
              </p>
              <p>
                <span>{user.followers?.length} </span> followers
              </p>
              <p>
                <span>{user.following?.length}</span> following
              </p>
            </div>
            <p className={styles.bio}>{user.bio}</p>
          </div>
        </div>
        <div className={styles.posts}>
          {posts.map((post) => (
            <UserPost key={post.postId} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};
