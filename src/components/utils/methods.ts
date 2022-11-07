import firebase from 'firebase/app';
import { auth, db } from '../../firebase';

export const followUser = async (uid: string, followId: string) => {
  await db
    .collection('users')
    .doc(followId)
    .update({
      followers: firebase.firestore.FieldValue.arrayUnion(uid),
      isFollowing: true,
    });

  await db
    .collection('users')
    .doc(uid)
    .update({
      following: firebase.firestore.FieldValue.arrayUnion(followId),
      isFollowing: true,
    });
};

export const unfollowUser = async (uid: string, followId: string) => {
  await db
    .collection('users')
    .doc(followId)
    .update({
      followers: firebase.firestore.FieldValue.arrayRemove(uid),
      isFollowing: false,
    });

  await db
    .collection('users')
    .doc(uid)
    .update({
      following: firebase.firestore.FieldValue.arrayRemove(followId),
      isFollowing: false,
    });
};
