import React from 'react';
import { Header } from '../../components/Header/Header';
import { Post } from '../../components/Post/Post';
import { Reels } from '../../components/Reels/Reels';
import { Suggestions } from '../../components/Suggestions/Suggestions';

import styles from './Home.module.scss';

export const Home: React.FC = () => {
  return (
    <div className={styles.root}>
      <Header />
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
