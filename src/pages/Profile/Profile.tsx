import React, { useEffect } from 'react';
import { ProfileImage } from '../../components/ProfileImage/ProfileImage';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectPost, selectUser } from '../../selectors/selectors';
import { auth, db } from '../../firebase';
import { setUser } from '../../redux/slices/user';
import { setPosts } from '../../redux/slices/post';

import styles from './Profile.module.scss';

export const Profile: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useSelector(selectUser);
  const { posts } = useSelector(selectPost);

  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUser = () => {
      db.collection('users')
        .doc(currentUser)
        .get()
        .then((doc) => {
          if (doc.exists) {
            dispatch(
              setUser({
                uid: doc.id,
                email: doc.data()?.email,
                fullName: doc.data()?.fullName,
                username: doc.data()?.username,
                imageUrl: doc.data()?.imageUrl,
                bio: doc.data()?.bio,
                followers: doc.data()?.followers,
                following: doc.data()?.following,
              }),
            );
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPosts = () => {
      db.collection('posts')
        .where('uid', '==', currentUser)
        .get()
        .then((querySnapshot) => {
          dispatch(
            setPosts(
              querySnapshot.docs.map((doc) => ({
                uid: doc.id,
                username: doc.data().username,
                profileImage: doc.data().profileImage,
                postUrl: doc.data().postUrl,
                postId: doc.data().postId,
                likes: doc.data().likes,
                description: doc.data().description,
                datePublished: doc.data().datePublished,
              })),
            ),
          );
        })
        .catch((e) => console.log(e));
    };

    fetchPosts();
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
            <div className={styles.post} key={post.postId}>
              <img src={post.postUrl} alt="user-post" />
              <div className={styles.overlay}>
                <div className={styles.overlayItem}>
                  <svg
                    className={styles.icon}
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24">
                    <path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z" />
                  </svg>
                  <p>{post.likes.length}</p>
                  <svg
                    className={styles.icon}
                    width="22"
                    height="22"
                    viewBox="0 0 60 68"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="30" fill="white" />
                    <path
                      d="M50.2149 45.5981L53.2474 62.651L36.9629 56.7508L50.2149 45.5981Z"
                      fill="white"
                    />
                  </svg>
                  <p>{post.likes.length}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
