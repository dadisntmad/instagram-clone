import React, { useState } from 'react';
import { FirestoreDate } from '../../types/post';
import { User } from '../../types/user';
import { PostModal } from '../PostModal/PostModal';

import styles from './UserPost.module.scss';

type UserPostProps = {
  uid: string;
  postUrl: string;
  likes: string[];
  username: string;
  profileImage: string;
  datePublished: FirestoreDate;
  description: string;
  postId: string;
  isLiked: boolean;
};

export const UserPost: React.FC<UserPostProps> = ({
  uid,
  postUrl,
  likes,
  username,
  profileImage,
  datePublished,
  description,
  postId,
  isLiked,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const onOpenModal = () => {
    setIsOpened(true);
  };

  const onCloseModal = () => {
    setIsOpened(false);
  };

  return (
    <>
      {isOpened && (
        <PostModal
          isOpened={isOpened}
          onCloseModal={onCloseModal}
          postUrl={postUrl}
          likes={likes}
          username={username}
          profileImage={profileImage}
          datePublished={datePublished}
          description={description}
          postId={postId}
          uid={uid}
          isLiked={isLiked}
        />
      )}
      <div className={styles.post} onClick={onOpenModal}>
        <img src={postUrl} alt="user-post" />
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
            <p>{likes.length}</p>
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
            <p>{likes.length}</p>
          </div>
        </div>
      </div>
    </>
  );
};
