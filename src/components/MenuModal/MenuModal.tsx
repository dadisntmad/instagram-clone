import React from 'react';
import { db } from '../../firebase';

import styles from './MenuModal.module.scss';

type MenuModalProps = {
  onCloseMenu: () => void;
  onCloseModal: () => void;
  postId: string;
  isAuthor: boolean;
};

export const MenuModal: React.FC<MenuModalProps> = ({
  onCloseMenu,
  onCloseModal,
  postId,
  isAuthor,
}) => {
  const onDeletePost = () => {
    db.collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        onCloseMenu();
        onCloseModal();
      });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {isAuthor && (
          <div className={styles.delete} onClick={onDeletePost}>
            Delete
          </div>
        )}
        <div className={styles.item} onClick={onCloseMenu}>
          Cancel
        </div>
      </div>
    </div>
  );
};
