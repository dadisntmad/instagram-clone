import firebase from 'firebase/app';
import { db } from '../../firebase';

export const followUnfollow = async (uid: string, followId: string) => {
  const following: string[] = await db
    .collection('users')
    .doc(uid)
    .get()
    .then((snap) => {
      return snap.data()?.following;
    });

  if (following.includes(followId)) {
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
      });
  } else {
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
      });
  }
};
