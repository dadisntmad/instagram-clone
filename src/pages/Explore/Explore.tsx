import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { setPosts } from '../../redux/slices/post';
import { useAppDispatch } from '../../redux/store';
import { selectPost } from '../../selectors/selectors';

import styles from './Explore.module.scss';

export const Explore = () => {
  const dispatch = useAppDispatch();

  const { posts } = useSelector(selectPost);

  useEffect(() => {
    const fetchPosts = () => {
      db.collection('posts')
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
    <div className={styles.root}>
      <div className={styles.container}>
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
