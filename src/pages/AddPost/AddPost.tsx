import React, { useRef } from 'react';

import picture from '../../assets/picture.png';
import { ProfileImage } from '../../components/ProfileImage/ProfileImage';

import styles from './AddPost.module.scss';

export const AddPost = () => {
  const selectRef = useRef<HTMLInputElement>(null);

  const textLength = 'test';
  const isSelected = false;

  const onImageSelect = () => {
    selectRef.current?.click();
  };

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.header}>
          <p>Create new post</p>
          {isSelected && <button>Share</button>}
        </div>
        {isSelected ? (
          <div className={styles.photo}>
            <img
              src="https://images.unsplash.com/photo-1666298864149-f693519a2556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
            <div className={styles.author}>
              <div className={styles.user}>
                <ProfileImage size={35} />
                <p>username</p>
              </div>
              <textarea
                className={styles.textarea}
                cols={40}
                rows={27}
                maxLength={2200}
                placeholder="Write a caption..."
              />
              <p className={styles.textLength}>{textLength.length}/2200</p>
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            <img src={picture} alt="preview" />
            <button onClick={onImageSelect}>Select from computer</button>
            <input ref={selectRef} type="file" hidden />
          </div>
        )}
      </div>
    </div>
  );
};
