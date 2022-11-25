import React, { useEffect, useState } from 'react';

import { useParams, Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';

import { followUnfollow } from '../../utils/methods';
import { auth, db } from '../../firebase';

import { fetchUser } from '../../redux/actions/user';
import { fetchUserPosts } from '../../redux/actions/post';

import { selectPost, selectUser } from '../../selectors/selectors';
import { setIsUserLoading } from '../../redux/slices/user';
import { setIsPostLoading } from '../../redux/slices/post';

import { User } from '../../types/user';
import { ProfileImage, ProfileLoader, UserPost, UserPostLoader } from '../../components';

import styles from './Profile.module.scss';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loggedInUser, setLoggedInUser] = useState<User>();

  const navigate = useNavigate();

  const { id } = useParams();

  const { user, isUserLoading } = useSelector(selectUser);
  const { posts, isPostLoading } = useSelector(selectPost);

  const currentUser = auth.currentUser?.uid;
  const dialogId = uuidv4();

  const getLoggedInUser = async () => {
    await db
      .collection('users')
      .doc(currentUser)
      .get()
      .then((doc) => {
        setLoggedInUser({
          uid: doc.data()?.uid,
          email: doc.data()?.email,
          fullName: doc.data()?.fullName,
          username: doc.data()?.username,
          imageUrl: doc.data()?.imageUrl,
          isFollowing: doc.data()?.isFollowing,
          following: doc.data()?.following,
          followers: doc.data()?.followers,
        });
      });
  };

  const fetchUserData = () => {
    if (id !== currentUser) {
      dispatch(fetchUser(String(id)));
      dispatch(fetchUserPosts(String(id)));
    } else {
      dispatch(fetchUser(String(currentUser)));
      dispatch(fetchUserPosts(String(currentUser)));
    }
  };

  useEffect(() => {
    dispatch(setIsUserLoading());
    dispatch(setIsPostLoading());
    fetchUserData();
    getLoggedInUser();
  }, [id]);

  const followUnfollowUser = (uid: string, followId: string) => async () => {
    await followUnfollow(uid, followId, posts);
    fetchUserData();
  };

  const onCreateDialog = async () => {
    const receiver = {
      uid: id,
      username: user.username,
      imageUrl: user?.imageUrl,
    };

    const sender = {
      uid: loggedInUser?.uid,
      username: loggedInUser?.username,
      imageUrl: loggedInUser?.imageUrl,
    };

    const data = {
      dialogId,
      createdOn: new Date(),
      receiver,
      sender,
      participants: [loggedInUser?.uid, id],
    };

    await db.collection('dialogs').doc(dialogId).set(data);
    navigate('/direct/inbox');
  };

  return (
    <div className={styles.profile}>
      <div className={styles.root}>
        {isUserLoading ? (
          <ProfileLoader />
        ) : (
          <div className={styles.profileHeader}>
            <ProfileImage size={150} imageUrl={user.imageUrl} />
            <div>
              <div className={styles.profileContent}>
                <p>{user?.username}</p>
                {id === currentUser ? (
                  <Link to="/accounts/edit">
                    <button className={styles.profileContentButton}>Edit profile</button>
                  </Link>
                ) : (
                  <div className={styles.profileContentButtons}>
                    <button className={styles.profileContentButton} onClick={onCreateDialog}>
                      Message
                    </button>
                    <button
                      className={styles.profileContentFollow}
                      onClick={followUnfollowUser(String(currentUser), user.uid)}>
                      {user.isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.statistics}>
                <p>
                  <span>{posts.length}</span>{' '}
                  {posts.length > 1 || posts.length === 0 ? 'posts' : 'post'}
                </p>
                <p>
                  <span>{user.followers?.length} </span> followers
                </p>
                <p>
                  <span>{user.following?.length}</span> following
                </p>
              </div>
              <p className={styles.bio}>{user.fullName}</p>
            </div>
          </div>
        )}
        <div className={styles.posts}>
          {posts &&
            posts.map((post) =>
              isPostLoading ? (
                <UserPostLoader key={post.postId} />
              ) : (
                <UserPost key={post.postId} {...post} />
              ),
            )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
