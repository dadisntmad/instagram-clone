import React from 'react';
import { Post } from '../../components/Post/Post';
import { Reels } from '../../components/Reels/Reels';
import { Suggestions } from '../../components/Suggestions/Suggestions';

import styles from './Home.module.scss';

export const Home: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div>
          <Reels />
          <Post />
        </div>
        <Suggestions />
      </div>
    </div>
  );
};
