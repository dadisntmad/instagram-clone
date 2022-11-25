import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { likePost, postComment } from '../../utils/methods';
import { auth } from '../../firebase';

import { useSelector } from 'react-redux';
import { selectUser } from '../../selectors/selectors';

import { FirestoreDate } from '../../types/post';

import { ProfileImage } from '../ProfileImage/ProfileImage';

import dots from '../../assets/dots.png';
import heart from '../../assets/heart.png';
import heartFill from '../../assets/heart_fill_red.png';
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
  postId,
  isLiked,
}) => {
  const [text, setText] = useState('');
  const { user } = useSelector(selectUser);

  const commentId = uuidv4();

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onPostComment = () => {
    postComment(String(currentUser), postId, commentId, text, user?.username, profileImage);
    setText('');
  };

  const currentUser = auth.currentUser?.uid;

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
      <img
        className={styles.image}
        src={postUrl}
        onDoubleClick={likePost(postId, String(currentUser))}
        alt="user-post"
      />
      <div className={styles.footer}>
        <div className={styles.footerActions}>
          <div className={styles.footerButtons}>
            <button onClick={likePost(postId, String(currentUser))}>
              <img src={isLiked ? heartFill : heart} alt="like" />
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
        <p className={styles.likesCount}>
          {likes.length} {likes.length > 1 || likes.length === 0 ? ' likes' : ' like'}
        </p>
        <div className={styles.author}>
          <p className={styles.authorUsername}>{username}</p>
          <p className={styles.authorComment}>{description}</p>
        </div>
        <button className={styles.viewCommentButton}>View all {comments.length} comments</button>
        <p className={styles.date}>{moment(datePublished.seconds * 1000).format('MMMM D')}</p>
        <div className={styles.comment}>
          <img src={smiley} alt="emoji" />
          <input
            type="text"
            placeholder="Add a comment..."
            value={text}
            onChange={onChangeComment}
          />
          <button disabled={!text} onClick={onPostComment}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
