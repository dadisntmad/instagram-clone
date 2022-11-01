import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserPost } from '../../components/UserPost/UserPost';
import { fetchPosts } from '../../redux/actions/post';
import { useAppDispatch } from '../../redux/store';
import { selectPost } from '../../selectors/selectors';

import styles from './Explore.module.scss';

export const Explore: React.FC = () => {
  const dispatch = useAppDispatch();

  const { posts } = useSelector(selectPost);

  useEffect(() => {
    dispatch(fetchPosts());
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
