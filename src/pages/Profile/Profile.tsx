import React from 'react';
import { ProfileImage } from '../../components/ProfileImage/ProfileImage';

import likes from '../../assets/heart_fill.png';
import comments from '../../assets/comment.png';

import styles from './Profile.module.scss';

const data = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1666146421175-28a429221ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    likes: likes,
    comments: comments,
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1666114301220-5159dc5f7e2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    likes: likes,
    comments: comments,
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1666096968009-f8b7bdd51ba3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    likes: likes,
    comments: comments,
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1666017685005-64e7d56aa4f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    likes: likes,
    comments: comments,
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1665806558925-930b7210d8bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    likes: likes,
    comments: comments,
  },
];

export const Profile: React.FC = () => {
  const isCurrentUser = true;

  return (
    <div className={styles.profile}>
      <div className={styles.root}>
        <div className={styles.profileHeader}>
          <ProfileImage size={150} />
          <div>
            <div className={styles.profileContent}>
              <p>username</p>
              {isCurrentUser ? (
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
                <span>1</span> post
              </p>
              <p>
                <span>17 </span> followers
              </p>
              <p>
                <span>10</span> following
              </p>
            </div>
            <p className={styles.bio}>Bio</p>
          </div>
        </div>
        <div className={styles.posts}>
          {data.map((post) => (
            <div className={styles.post} key={post.id}>
              <img src={post.image} alt="user-post" />
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
                  <p>10</p>
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
                  <p>10</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
