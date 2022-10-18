import React from 'react';
import { ProfileImage } from '../ProfileImage/ProfileImage';

import styles from './Reels.module.scss';

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

export const Reels: React.FC = () => {
  return (
    <div className={styles.root}>
      {data.map((user) => (
        <div className={styles.reel} key={user.id}>
          <ProfileImage size={user.size} imageUrl={user.imageUrl} />
          <p>{user.username}</p>
        </div>
      ))}
    </div>
  );
};
