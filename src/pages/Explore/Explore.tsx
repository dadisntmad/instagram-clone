import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserPost } from '../../components/UserPost/UserPost';
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
            <UserPost key={post.postId} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};
