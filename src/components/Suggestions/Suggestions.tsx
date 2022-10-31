import React, { useState, useEffect } from 'react';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { User } from '../../types/user';

import styles from './Suggestions.module.scss';

export const Suggestions: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);

  const currentUser = auth.currentUser?.uid;

  const signOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    const fetchUser = () => {
      db.collection('users')
        .doc(currentUser)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUser({
              uid: doc.id,
              email: doc.data()?.email,
              fullName: doc.data()?.fullName,
              username: doc.data()?.username,
              imageUrl: doc.data()?.imageUrl,
              bio: doc.data()?.bio,
              followers: doc.data()?.followers,
              following: doc.data()?.following,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUsers = () => {
      db.collection('users')
        .where('uid', '!=', currentUser)
        .limit(5)
        .get()
        .then((querySnapshot) => {
          setUsers(
            querySnapshot.docs.map((doc) => ({
              uid: doc.id,
              email: doc.data()?.email,
              fullName: doc.data()?.fullName,
              username: doc.data()?.username,
              imageUrl: doc.data()?.imageUrl,
              bio: doc.data()?.bio,
              followers: doc.data()?.followers,
              following: doc.data()?.following,
            })),
          );
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.user}>
        <div className={styles.userContent}>
          <ProfileImage size={64} imageUrl={user?.imageUrl} />
          <div>
            <p className={styles.username}>{user?.username}</p>
            <p className={styles.name}>{user?.bio}</p>
          </div>
        </div>
        <button onClick={signOut}>Sign Out</button>
      </div>
      <div className={styles.suggestions}>
        <p>Suggestions For You</p>
        <Link to="/explore/people">
          <button>See All</button>
        </Link>
      </div>
      {users.map((user) => (
        <div className={styles.user} key={user.uid}>
          <div className={styles.userContent}>
            <ProfileImage size={40} imageUrl={user.imageUrl} />
            <div>
              <p className={styles.username}>{user.username}</p>
              <p className={styles.name}>{user.username}</p>
            </div>
          </div>
          <button>Follow</button>
        </div>
      ))}
    </div>
  );
};
