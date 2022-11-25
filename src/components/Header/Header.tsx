import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { auth } from '../../firebase';

import { SearchBar } from '../SearchBar/SearchBar';

import logo from '../../assets/logo.png';
import home from '../../assets/home.png';
import homeFill from '../../assets/home_fill.png';
import messenger from '../../assets/messenger.png';
import messengerFill from '../../assets/messenger_fill.png';
import add from '../../assets/add.png';
import addFill from '../../assets/add_fill.png';
import explore from '../../assets/explore.png';
import exploreFill from '../../assets/explore_fill.png';
import heart from '../../assets/heart.png';
import heartFill from '../../assets/heart_fill.png';
import user from '../../assets/user.png';
import userFill from '../../assets/user_fill.png';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const currentUser = auth.currentUser?.uid;
  const data = [
    {
      id: 0,
      inactive: home,
      active: homeFill,
      linkTo: '/',
      width: 28,
      alt: 'home',
    },
    {
      id: 1,
      inactive: messenger,
      active: messengerFill,
      linkTo: '/direct/inbox',
      width: 28,
      alt: 'messages',
    },
    {
      id: 2,
      inactive: add,
      active: addFill,
      linkTo: '/new-post',
      width: 28,
      alt: 'new-post',
    },
    {
      id: 3,
      inactive: explore,
      active: exploreFill,
      linkTo: '/explore',
      width: 28,
      alt: 'explore',
    },
    {
      id: 4,
      inactive: heart,
      active: heartFill,
      linkTo: '',
      width: 28,
      alt: 'likes',
    },
    {
      id: 5,
      inactive: user,
      active: userFill,
      linkTo: `/${currentUser}`,
      width: 28,
      alt: 'profile',
    },
  ];
  const [active, setActive] = useState(0);

  const onActiveChange = (index: number) => () => {
    setActive(index);
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link to="/">
            <img src={logo} alt="logo" width={105} />
          </Link>
          {/* searchbar */}
          <SearchBar />
          {/* nav menu */}
          <div className={styles.menu}>
            {data.map((item, index) => (
              <div key={item.id} onClick={onActiveChange(index)}>
                <Link to={item.linkTo}>
                  <img
                    src={active === index ? item.active : item.inactive}
                    width={item.width}
                    alt={item.alt}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
