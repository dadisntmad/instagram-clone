import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Post, Reels, Suggestions } from '../../components';
import { PostLoader } from '../../components/Loaders/PostLoader';
import { ReelsLoader } from '../../components/Loaders/ReelsLoader';
import { SuggestionsLoader } from '../../components/Loaders/SuggestionsLoader';
import { auth } from '../../firebase';
import { fetchUserFollowingPosts } from '../../redux/actions/post';
import { setIsPostLoading } from '../../redux/slices/post';
import { useAppDispatch } from '../../redux/store';
import { selectPost } from '../../selectors/selectors';

import styles from './Home.module.scss';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { userFollowingPosts, isPostLoading } = useSelector(selectPost);

  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    dispatch(setIsPostLoading());
    dispatch(fetchUserFollowingPosts(String(currentUser)));
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div>
          {isPostLoading ? <ReelsLoader /> : <Reels />}
          {isPostLoading ? (
            <PostLoader />
          ) : (
            userFollowingPosts &&
            userFollowingPosts.map((post) => <Post key={post.postId} {...post} />)
          )}
        </div>
        {isPostLoading ? <SuggestionsLoader /> : <Suggestions />}
      </div>
    </div>
  );
};
