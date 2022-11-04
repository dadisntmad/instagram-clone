import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileImage } from '../../components/ProfileImage/ProfileImage';
import { useSelector } from 'react-redux';
import { auth, db, storage } from '../../firebase';
import { fetchUser } from '../../redux/actions/user';
import { useAppDispatch } from '../../redux/store';
import { selectUser } from '../../selectors/selectors';

import styles from './EditAccount.module.scss';

export const EditAccount: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(selectUser);

  const [file, setFile] = useState<Blob | any>(user.imageUrl);
  const [fullName, setFullName] = useState(user.fullName);
  const [username, setUsername] = useState(user.username);

  const fileRef = useRef<HTMLInputElement>(null);

  const currentUser = auth.currentUser?.uid;

  const childPath = `profile/${currentUser}/${Math.random().toString(36)}`;

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
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
        navigate(`/${currentUser}`);
        setFullName('');
        setUsername('');
        setFile(null);
      });
    };

    const taskError = (snapshot: any) => {
      console.log(snapshot);
    };

    task.on('state_changed', taskProgress, taskError, taskCompleted);
  };

  const onSavePost = (fileUrl: string) => {
    db.collection('users').doc(currentUser).update({
      fullName: fullName,
      username: username,
      imageUrl: fileUrl,
    });
  };

  useEffect(() => {
    dispatch(fetchUser(String(currentUser)));
  }, []);

  const onFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.edit}>
        <div className={styles.profile}>
          <ProfileImage size={40} imageUrl={user.imageUrl} />
          <div>
            <p>{user.username}</p>
            <button onClick={() => fileRef.current?.click()}>Change profile photo</button>
            <input type="file" hidden ref={fileRef} onChange={onFileChange} />
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.formField}>
            <input type="text" placeholder="Name" value={fullName} onChange={onFullNameChange} />
          </div>
          <div className={styles.formField}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={onUsernameChange}
            />
          </div>
          <button className={styles.submitButton} onClick={onSelectImage}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
