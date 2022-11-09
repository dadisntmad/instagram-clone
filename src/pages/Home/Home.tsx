import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Post } from '../../components/Post/Post';
import { Reels } from '../../components/Reels/Reels';
import { Suggestions } from '../../components/Suggestions/Suggestions';
import { auth } from '../../firebase';
import { fetchUserFollowingPosts } from '../../redux/actions/post';
import { useAppDispatch } from '../../redux/store';
import { selectPost } from '../../selectors/selectors';

import styles from './Home.module.scss';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { userFollowingPosts } = useSelector(selectPost);

  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    dispatch(fetchUserFollowingPosts(String(currentUser)));
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div>
          <Reels />
          {userFollowingPosts &&
            userFollowingPosts.map((post) => <Post key={post.postId} {...post} />)}
        </div>
        <Suggestions />
      </div>
    </div>
  );
};
