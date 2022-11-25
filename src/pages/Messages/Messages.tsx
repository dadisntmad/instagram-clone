import React, { useState, useEffect } from 'react';

import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { useAppDispatch } from '../../redux/store';
import { auth, db } from '../../firebase';

import { fetchUser } from '../../redux/actions/user';
import { fetchDialogs, fetchMessages } from '../../redux/actions/message';

import { Message, Participant } from '../../types/messages';

import { selectMessage, selectUser } from '../../selectors/selectors';
import { ProfileImage } from '../../components';

import send from '../../assets/send.png';
import smiley from '../../assets/smiley.png';

import styles from './Messages.module.scss';

const Messages: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [text, setText] = useState('');
  const [receiver, setReceiver] = useState<Participant>();

  const { dialogId } = useParams();

  const { dialogs, messages } = useSelector(selectMessage);
  const { user } = useSelector(selectUser);

  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    dispatch(fetchUser(String(currentUser)));
    dispatch(fetchDialogs(String(currentUser)));
    dispatch(fetchMessages(String(dialogId)));
  }, [dialogId]);

  const findReceiver = (user: Participant) => () => {
    setReceiver({
      uid: user.uid,
      imageUrl: user.imageUrl,
      username: user.username,
    });
  };

  const onMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSendMessage = async () => {
    const data: Message = {
      createdOn: new Date(),
      sendMessage: {
        uid: String(currentUser),
        imageUrl: user?.imageUrl,
        username: user?.username,
        message: text,
      },
      receivedMessage: {
        uid: String(receiver?.uid),
        imageUrl: String(receiver?.imageUrl),
        username: String(receiver?.username),
        message: text,
      },
    };

    await db.collection('dialogs').doc(dialogId).collection('messages').add(data);

    setText('');
  };

  const onDeleteChat = async () => {
    await db.collection('dialogs').doc(dialogId).delete();
    navigate('/direct/inbox');
  };

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {/* left side */}
        <div className={styles.left}>
          <div className={styles.username}>{user?.username}</div>
          {dialogs &&
            dialogs.map((dialog) => (
              <Link to={`/direct/inbox/${dialog.dialogId}`} key={dialog.dialogId}>
                <div
                  onClick={findReceiver(dialog.receiver)}
                  className={cn(styles.message, {
                    [styles.active]: dialogId === dialog.dialogId,
                  })}>
                  <ProfileImage
                    size={60}
                    imageUrl={
                      dialog.sender.uid === currentUser
                        ? dialog.receiver.imageUrl
                        : dialog.sender.imageUrl
                    }
                  />
                  <p>
                    {dialog.sender.uid === currentUser
                      ? dialog.receiver.username
                      : dialog.sender.username}
                  </p>
                </div>
              </Link>
            ))}
        </div>
        {/* right side */}
        <div className={styles.right}>
          {dialogId ? (
            <>
              <div className={styles.header}>
                <p>{receiver?.username}</p>
                <svg
                  onClick={onDeleteChat}
                  fill="red"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="24px"
                  height="24px">
                  <path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 10.238281 10 A 1.50015 1.50015 0 0 0 9.9804688 9.9785156 A 1.50015 1.50015 0 0 0 9.7578125 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6386719 13 L 11.15625 39.029297 C 11.427329 41.835926 13.811782 44 16.630859 44 L 31.367188 44 C 34.186411 44 36.570826 41.836168 36.841797 39.029297 L 39.361328 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 38.244141 10 A 1.50015 1.50015 0 0 0 37.763672 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 11.650391 13 L 36.347656 13 L 33.855469 38.740234 C 33.730439 40.035363 32.667963 41 31.367188 41 L 16.630859 41 C 15.331937 41 14.267499 40.033606 14.142578 38.740234 L 11.650391 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z" />
                </svg>
              </div>
              <div className={styles.chat}>
                {messages &&
                  messages.map((message, index) => (
                    <div key={`message/${message.sendMessage.uid}/${index}`}>
                      {message.sendMessage.uid === currentUser ? (
                        <div className={styles.sent}>
                          <p>{message.sendMessage.message}</p>
                        </div>
                      ) : (
                        <div className={styles.received}>
                          <ProfileImage size={25} imageUrl={message.sendMessage.imageUrl} />
                          <p>{message.receivedMessage.message}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <div className={styles.input}>
                <img className={styles.smiley} src={smiley} alt="smiley" />
                <input
                  type="text"
                  placeholder="Message..."
                  value={text}
                  onChange={onMessageChange}
                />
                <button onClick={onSendMessage} disabled={!text}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className={styles.info}>
              <img src={send} alt="send" />
              <p>Your Messages</p>
              <span>Send private messages to a friend.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
