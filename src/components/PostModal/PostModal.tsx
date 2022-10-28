import React, { useEffect } from 'react';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { User } from '../../types/user';

import dots from '../../assets/dots.png';
import heart from '../../assets/heart.png';
import comment from '../../assets/comment.png';
import send from '../../assets/send.png';
import bookmark from '../../assets/bookmark.png';
import smiley from '../../assets/smiley.png';

import styles from './PostModal.module.scss';

type PostModalProps = {
  isOpened: boolean;
  onCloseModal: () => void;
  postUrl: string;
  likes: User[];
  username: string;
  profileImage: string;
};

export const PostModal: React.FC<PostModalProps> = ({
  isOpened,
  onCloseModal,
  postUrl,
  likes,
  username,
  profileImage,
}) => {
  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, []);

  return (
    <div className={styles.overlay}>
      <svg
        onClick={onCloseModal}
        style={{ position: 'absolute', top: 24, right: 24, cursor: 'pointer' }}
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24px"
        height="24px">
        <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
      </svg>
      <div className={styles.modal}>
        <img src={postUrl} alt="post" />
        <div className={styles.comments}>
          <div className={styles.author}>
            <div>
              <ProfileImage size={40} imageUrl={profileImage} />
              <p>{username}</p>
            </div>
            <img src={dots} alt="menu" />
          </div>
          <div className={styles.comment}>
            <h3>No comments yet.</h3>
            <span>Start the conversation</span>
          </div>
          <div className={styles.footer}>
            <div className={styles.footerActions}>
              <div className={styles.footerButtons}>
                <button>
                  <img src={heart} alt="like" />
                </button>
                <button>
                  <img src={comment} alt="comment" />
                </button>
                <button>
                  <img src={send} alt="send" />
                </button>
              </div>
              <button>
                <img src={bookmark} alt="bookmark" />
              </button>
            </div>
            <p className={styles.likes}>
              {likes.length}
              {likes.length > 1 || likes.length === 0 ? ' likes' : ' like'}
            </p>
            <p className={styles.date}>october 18</p>
            <div className={styles.form}>
              <img src={smiley} alt="smiley-face" />
              <input type="text" placeholder="Add a comment..." />
              <button>Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
