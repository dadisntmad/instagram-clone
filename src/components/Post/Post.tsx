import React from 'react';
import { ProfileImage } from '../ProfileImage/ProfileImage';

import dots from '../../assets/dots.png';
import heart from '../../assets/heart.png';
import comment from '../../assets/comment.png';
import send from '../../assets/send.png';
import bookmark from '../../assets/bookmark.png';
import smiley from '../../assets/smiley.png';

import styles from './Post.module.scss';

export const Post: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerUsername}>
          <ProfileImage size={35} />
          <p>username</p>
        </div>
        <button>
          <img src={dots} alt="menu" />
        </button>
      </div>
      <img
        className={styles.image}
        src="https://images.unsplash.com/photo-1666017686492-cc404aae890e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        alt="user-post"
      />
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
        <p className={styles.likesCount}>17 likes</p>
        <div className={styles.author}>
          <p className={styles.authorUsername}>username</p>
          <p className={styles.authorComment}>comment</p>
        </div>
        <button className={styles.viewCommentButton}>View all 3 comments</button>
        <p className={styles.date}>october 18</p>
        <div className={styles.comment}>
          <img src={smiley} alt="emoji" />
          <input type="text" placeholder="Add a comment..." />
          <button>Post</button>
        </div>
      </div>
    </div>
  );
};
