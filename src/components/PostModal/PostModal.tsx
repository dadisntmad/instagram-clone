import React, { useEffect, useState } from 'react';
import { MenuModal } from '../MenuModal/MenuModal';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { User } from '../../types/user';
import { FirestoreDate } from '../../types/post';
import { useSelector } from 'react-redux';
import { selectComment } from '../../selectors/selectors';
import { useAppDispatch } from '../../redux/store';
import { auth, db } from '../../firebase';
import { setComments } from '../../redux/slices/comment';
import moment from 'moment';

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
  datePublished: FirestoreDate;
  description: string;
  postId: string;
  uid: string;
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
}) => {
  const dispatch = useAppDispatch();

  const [menuOpened, setMenuOpened] = useState(false);

  const { comments } = useSelector(selectComment);

  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, []);

  useEffect(() => {
    const fetchComments = () => {
      db.collection('posts')
        .doc(postId)
        .collection('comments')
        .get()
        .then((querySnapshot) => {
          dispatch(
            setComments(
              querySnapshot.docs.map((doc) => ({
                uid: doc.id,
                commentId: doc.id,
                text: doc.data().text,
                profilePic: doc.data().profilePic,
                name: doc.data().name,
                datePublished: doc.data().datePublished,
              })),
            ),
          );
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchComments();
  }, []);

  const onOpenMenu = () => {
    setMenuOpened(true);
  };

  const onCloseMenu = () => {
    setMenuOpened(false);
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
          <img src={postUrl} alt="post" />
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
                {comments.map((comment) => (
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
              <p className={styles.date}>{moment(datePublished.seconds * 1000).format('MMMM D')}</p>
              <div className={styles.form}>
                <img src={smiley} alt="smiley-face" />
                <input type="text" placeholder="Add a comment..." />
                <button>Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
