import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { ProfileImage } from '../ProfileImage/ProfileImage';

import styles from './Suggestions.module.scss';

const data = [
  {
    id: 1,
    size: 64,
    imageUrl:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    username: 'pufferfish',
  },
  {
    id: 2,
    size: 64,
    imageUrl:
      'https://images.unsplash.com/photo-1495216875107-c6c043eb703f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    username: 'brainy',
  },
  {
    id: 3,
    size: 64,
    imageUrl:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    username: 'spiteful',
  },
  {
    id: 4,
    size: 64,
    imageUrl:
      'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    username: 'unfolded',
  },
  {
    id: 5,
    size: 64,
    username: 'heath',
  },
];

export const Suggestions: React.FC = () => {
  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className={styles.root}>
      <div className={styles.user}>
        <div className={styles.userContent}>
          <ProfileImage size={64} />
          <div>
            <p className={styles.username}>dadisntmad</p>
            <p className={styles.name}>Ruslan</p>
          </div>
        </div>
        <button onClick={signOut}>Sign Out</button>
      </div>
      <div className={styles.suggestions}>
        <p>Suggestions For You</p>
        <Link to="/explore/people">
          <button>See All</button>
        </Link>
      </div>
      {data.map((user) => (
        <div className={styles.user} key={user.id}>
          <div className={styles.userContent}>
            <ProfileImage size={40} imageUrl={user.imageUrl} />
            <div>
              <p className={styles.username}>{user.username}</p>
              <p className={styles.name}>{user.username}</p>
            </div>
          </div>
          <button>Follow</button>
        </div>
      ))}
    </div>
  );
};
