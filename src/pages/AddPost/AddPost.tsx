import React, { useRef, useState, useEffect } from 'react';
import { ProfileImage } from '../../components/ProfileImage/ProfileImage';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/app';
import { auth, db, storage } from '../../firebase';
import { User } from '../../types/user';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectUser } from '../../selectors/selectors';

import picture from '../../assets/picture.png';

import styles from './AddPost.module.scss';
import { fetchUser } from '../../redux/actions/user';

export const AddPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(selectUser);

  const [file, setFile] = useState<Blob | any>();
  const [selectedFile, setSelectedFile] = useState<Blob | any>();
  // const [user, setUser] = useState<User>();
  const [caption, setCaption] = useState('');

  const selectRef = useRef<HTMLInputElement>(null);

  const currentUser = auth.currentUser?.uid;
  const postId = uuidv4();

  const childPath = `posts/${currentUser}/${Math.random().toString(36)}`;

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
    setSelectedFile(URL.createObjectURL(e.target.files![0]));
  };

  const onSelectImage = async () => {
    // reference
    const task = storage.ref().child(childPath).put(file, { contentType: 'image/jpeg' });

    const taskProgress = (snapshot: any) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        onSavePost(snapshot);
        navigate('/profile');
        setCaption('');
        setFile(null);
      });
    };

    const taskError = (snapshot: any) => {
      console.log(snapshot);
    };

    task.on('state_changed', taskProgress, taskError, taskCompleted);
  };

  const onSavePost = (fileUrl: string) => {
    const data = {
      uid: currentUser,
      username: user?.username,
      profileImage: user?.imageUrl,
      postUrl: fileUrl,
      postId: postId,
      likes: [],
      comments: [],
      description: caption,
      datePublished: firebase.firestore.FieldValue.serverTimestamp(),
    };

    db.collection('posts').doc(postId).set(data);
  };

  const onCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchUser(String(currentUser)));
  }, []);

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.header}>
          <p>Create new post</p>
          {file && <button onClick={onSelectImage}>Share</button>}
        </div>
        {file ? (
          <div className={styles.photo}>
            <img src={selectedFile} alt="picked-file" />
            <div className={styles.author}>
              <div className={styles.user}>
                <ProfileImage size={35} imageUrl={user?.imageUrl} />
                <p>{user?.username}</p>
              </div>
              <textarea
                value={caption}
                onChange={onCaptionChange}
                className={styles.textarea}
                cols={40}
                rows={27}
                maxLength={2200}
                placeholder="Write a caption..."
              />
              <p className={styles.textLength}>{caption.length}/2200</p>
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            <img src={picture} alt="preview" />
            <button onClick={() => selectRef.current?.click()}>Select from computer</button>
            <input ref={selectRef} type="file" hidden onChange={onFileChange} />
          </div>
        )}
      </div>
    </div>
  );
};
