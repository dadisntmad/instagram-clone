import React from 'react';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { FirestoreDate } from '../../types/post';
import { Link } from 'react-router-dom';
import moment from 'moment';

import dots from '../../assets/dots.png';
import heart from '../../assets/heart.png';
import comment from '../../assets/comment.png';
import send from '../../assets/send.png';
import bookmark from '../../assets/bookmark.png';
import smiley from '../../assets/smiley.png';

import styles from './Post.module.scss';

type PostProps = {
  uid: string;
  postUrl: string;
  likes: string[];
  comments: string[];
  username: string;
  profileImage: string;
  datePublished: FirestoreDate;
  description: string;
  postId: string;
  isLiked: boolean;
};

export const Post: React.FC<PostProps> = ({
  uid,
  postUrl,
  likes,
  comments,
  username,
  profileImage,
  datePublished,
  description,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Link to={`/${uid}`}>
          <div className={styles.headerUsername}>
            <ProfileImage size={35} imageUrl={profileImage} />
            <p>{username}</p>
          </div>
        </Link>
        <button>
          <img src={dots} alt="menu" />
        </button>
      </div>
      <img className={styles.image} src={postUrl} alt="user-post" />
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
        <p className={styles.likesCount}>{likes.length} likes</p>
        <div className={styles.author}>
          <p className={styles.authorUsername}>{username}</p>
          <p className={styles.authorComment}>{description}</p>
        </div>
        <button className={styles.viewCommentButton}>View all {comments.length} comments</button>
        <p className={styles.date}>{moment(datePublished.seconds * 1000).format('MMMM D')}</p>
        <div className={styles.comment}>
          <img src={smiley} alt="emoji" />
          <input type="text" placeholder="Add a comment..." />
          <button>Post</button>
        </div>
      </div>
    </div>
  );
};
