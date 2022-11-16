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
          .collection('following_posts')
          .doc(post.postId)
          .delete();
      } else {
        await db
          .collection('users')
          .doc(uid)
          .collection('following_posts')
          .doc(post.postId)
          .set(data);
      }
    });
  };

  getFollowingPosts();
};

export const likePost = (postId: string, uid: string) => async () => {
  const likes: string[] = await db
    .collection('users')
    .doc(uid)
    .collection('following_posts')
    .doc(postId)
    .get()
    .then((doc) => {
      return doc.data()?.likes;
    });

  if (likes.includes(uid)) {
    await db
      .collection('users')
      .doc(uid)
      .collection('following_posts')
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(uid),
        isLiked: false,
      });

    await db
      .collection('posts')
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(uid),
        isLiked: false,
      });
  } else {
    await db
      .collection('users')
      .doc(uid)
      .collection('following_posts')
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(uid),
        isLiked: true,
      });

    await db
      .collection('posts')
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(uid),
        isLiked: true,
      });
  }
};

export const postComment = async (
  uid: string,
  postId: string,
  commentId: string,
  text: string,
  name: string,
  profilePic: string,
) => {
  const data = {
    commentId,
    text,
    uid,
    name,
    profilePic,
    datePublished: new Date(),
  };

  await db
    .collection('users')
    .doc(uid)
    .collection('following_posts')
    .doc(postId)
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion(data),
    });

  await db
    .collection('posts')
    .doc(postId)
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion(data),
    });
};
