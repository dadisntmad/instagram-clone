import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { likePost, postComment } from '../../utils/methods';
import { auth } from '../../firebase';

import { useAppDispatch } from '../../redux/store';
import { fetchComments } from '../../redux/actions/comment';
import { setText } from '../../redux/slices/comment';

import { useSelector } from 'react-redux';
import { selectComment, selectUser } from '../../selectors/selectors';

import { FirestoreDate } from '../../types/post';

import { MenuModal } from '../MenuModal/MenuModal';
import { ProfileImage } from '../ProfileImage/ProfileImage';

import dots from '../../assets/dots.png';
import heart from '../../assets/heart.png';
import heartFill from '../../assets/heart_fill_red.png';
import comment from '../../assets/comment.png';
import send from '../../assets/send.png';
import bookmark from '../../assets/bookmark.png';
import smiley from '../../assets/smiley.png';

import styles from './PostModal.module.scss';

type PostModalProps = {
  isOpened: boolean;
  onCloseModal: () => void;
  postUrl: string;
  likes: string[];
  username: string;
  profileImage: string;
  datePublished: FirestoreDate;
  description: string;
  postId: string;
  uid: string;
  isLiked: boolean;
};

export const PostModal: React.FC<PostModalProps> = ({
  isOpened,
  onCloseModal,
  postUrl,
  likes,
  username,
  profileImage,
  datePublished,
  description,
  postId,
  uid,
  isLiked,
}) => {
  const dispatch = useAppDispatch();

  const [menuOpened, setMenuOpened] = useState(false);

  const { comments, text } = useSelector(selectComment);
  const { user } = useSelector(selectUser);

  const currentUser = auth.currentUser?.uid;
  const commentId = uuidv4();

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpened]);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, []);

  const onOpenMenu = () => {
    setMenuOpened(true);
  };

  const onCloseMenu = () => {
    setMenuOpened(false);
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setText(e.target.value));
  };

  const onPostComment = async () => {
    postComment(user?.uid, postId, commentId, text, user?.username, user?.imageUrl);
    dispatch(setText(''));
  };

  return (
    <>
      {menuOpened && (
        <MenuModal
          onCloseMenu={onCloseMenu}
          onCloseModal={onCloseModal}
          postId={postId}
          isAuthor={uid === currentUser}
        />
      )}
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
          <img src={postUrl} alt="post" onDoubleClick={likePost(postId, String(currentUser))} />
          <div className={styles.comments}>
            <div className={styles.author}>
              <div>
                <ProfileImage size={40} imageUrl={profileImage} />
                <p>{username}</p>
              </div>
              <img src={dots} alt="menu" onClick={onOpenMenu} />
            </div>
            <div className={styles.commentActive}>
              <div className={styles.commentAuthor}>
                <ProfileImage size={40} imageUrl={profileImage} />
                <p>{username}</p>
                <div>{description}</div>
              </div>
              <div className={styles.commentsBlock}>
                {comments &&
                  comments.map((comment) => (
                    <div className={styles.userComment} key={comment.commentId}>
                      <div className={styles.userData}>
                        <ProfileImage size={35} imageUrl={comment.profilePic} />
                        <p>{comment.name}</p>
                        <div>{comment.text}</div>
                      </div>
                      <span>{moment(comment.datePublished.seconds * 1000).format('MMMM D')}</span>
                    </div>
                  ))}
              </div>
            </div>
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
              <p className={styles.likes}>
                {likes.length}
                {likes.length > 1 || likes.length === 0 ? ' likes' : ' like'}
              </p>
              <p className={styles.date}>{moment(datePublished.seconds * 1000).format('MMMM D')}</p>
              <div className={styles.form}>
                <img src={smiley} alt="smiley-face" />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={text}
                  onChange={onTextChange}
                />
                <button onClick={onPostComment} disabled={!text}>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
