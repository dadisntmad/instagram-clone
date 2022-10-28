import React, { useEffect } from 'react';
import { ProfileImage } from '../../components/ProfileImage/ProfileImage';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectPost, selectUser } from '../../selectors/selectors';
import { auth, db } from '../../firebase';
import { setUser } from '../../redux/slices/user';
import { setPosts } from '../../redux/slices/post';

import styles from './Profile.module.scss';
import { UserPost } from '../../components/UserPost/UserPost';

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
        .orderBy('datePublished', 'desc')
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
            <UserPost key={post.postId} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};
