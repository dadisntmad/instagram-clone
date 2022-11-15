import firebase from 'firebase/app';
import { db } from '../firebase';
import { Post } from '../types/post';

export const followUnfollow = async (uid: string, followId: string, posts?: Post[]) => {
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

  const getFollowingPosts = () => {
    return posts?.map(async (post) => {
      const data = {
        uid: post.uid,
        username: post.username,
        profileImage: post?.profileImage,
        postUrl: post.postUrl,
        postId: post.postId,
        likes: post?.likes,
        comments: post?.comments,
        description: post?.description,
        datePublished: post.datePublished,
        isLiked: post.isLiked,
      };

      if (following.includes(followId)) {
        await db
          .collection('users')
          .doc(uid)
          .update({
            followingPosts: firebase.firestore.FieldValue.arrayRemove(data),
          });
      } else {
        await db
          .collection('users')
          .doc(uid)
          .update({
            followingPosts: firebase.firestore.FieldValue.arrayUnion(data),
          });
      }
    });
  };

  getFollowingPosts();
};
