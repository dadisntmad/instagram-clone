import React, { useState } from 'react';
import { ProfileImage } from '../../components/ProfileImage/ProfileImage';
import cn from 'classnames';

import send from '../../assets/send.png';
import smiley from '../../assets/smiley.png';

import styles from './Messages.module.scss';

const users = [
  {
    id: 0,
    imageUrl:
      'https://images.pexels.com/photos/1087735/pexels-photo-1087735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    username: 'frap',
  },
  {
    id: 1,
    imageUrl:
      'https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    username: 'lovesick',
  },
  {
    id: 2,
    imageUrl:
      'https://images.pexels.com/photos/762527/pexels-photo-762527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    username: 'mention',
  },
  {
    id: 3,
    imageUrl:
      'https://images.pexels.com/photos/571169/pexels-photo-571169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    username: 'sneer',
  },
  {
    id: 4,
    imageUrl:
      'https://images.pexels.com/photos/673649/pexels-photo-673649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    username: 'ginger',
  },
  {
    id: 5,
    imageUrl:
      'https://images.pexels.com/photos/982263/pexels-photo-982263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    username: 'overflow',
  },
  {
    id: 6,
    imageUrl:
      'https://images.pexels.com/photos/1417255/pexels-photo-1417255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    username: 'needy',
  },
  {
    id: 7,
    imageUrl:
      'https://images.pexels.com/photos/1927595/pexels-photo-1927595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    username: 'sever',
  },
  {
    id: 8,
    imageUrl:
      'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    username: 'abrupt',
  },
  {
    id: 9,
    imageUrl:
      'https://images.pexels.com/photos/709143/pexels-photo-709143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    username: 'rhythm',
  },
  {
    id: 10,
    imageUrl:
      'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    username: 'windbag',
  },
  {
    id: 11,
    imageUrl:
      'https://images.pexels.com/photos/1136575/pexels-photo-1136575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    username: 'each',
  },
  {
    id: 12,
    imageUrl:
      'https://images.pexels.com/photos/1047051/pexels-photo-1047051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    username: 'artificial',
  },
  {
    id: 13,
    imageUrl:
      'https://images.pexels.com/photos/595747/pexels-photo-595747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    username: 'defend',
  },
  {
    id: 14,
    imageUrl:
      'https://images.pexels.com/photos/1655329/pexels-photo-1655329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    username: 'simply',
  },
];

const messages = [
  {
    id: 0,
    receivedMessage: 'Hello, how are you?',
    sentMessage: 'fine, wby?',
  },
  {
    id: 1,
    receivedMessage: 'where r u?',
    sentMessage: 'i will arrive in 10 mins',
  },
  {
    id: 2,
    receivedMessage: 'have u seen this movie? (link)',
    sentMessage: 'yeah',
  },
];

export const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>();

  const onActiveChat = (index: number) => () => {
    setSelectedChat(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {/* left side */}
        <div className={styles.left}>
          <div className={styles.username}>username</div>
          {users.map((message, index) => (
            <div
              className={cn(styles.message, {
                [styles.active]: selectedChat === index,
              })}
              key={message.id}
              onClick={onActiveChat(index)}>
              <ProfileImage size={60} imageUrl={message.imageUrl} />
              <p>{message.username}</p>
            </div>
          ))}
        </div>
        {/* right side */}
        <div className={styles.right}>
          {selectedChat ? (
            <>
              <div className={styles.chat}>
                {messages.map((message) => (
                  <div key={message.id}>
                    <div className={styles.received}>
                      <ProfileImage size={25} />
                      <p>{message.receivedMessage}</p>
                    </div>
                    <div className={styles.sent}>
                      <p>{message.sentMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.input}>
                <img className={styles.smiley} src={smiley} alt="smiley" />
                <input type="text" placeholder="Message..." />
                <button>Send</button>
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
