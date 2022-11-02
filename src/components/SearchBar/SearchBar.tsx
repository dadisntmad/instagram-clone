import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchSearchingUsers } from '../../redux/actions/user';
import { useAppDispatch } from '../../redux/store';
import { selectUser } from '../../selectors/selectors';
import { ProfileImage } from '../ProfileImage/ProfileImage';

import styles from './SearchBar.module.scss';

type PopupClick = MouseEvent & {
  path: Node[];
};

export const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { searchingUsers } = useSelector(selectUser);

  const modalRef = useRef<HTMLDivElement>(null);

  const onInputClear = () => {
    setSearchValue('');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const _event = e as PopupClick;
      if (modalRef.current && !_event.path.includes(modalRef.current)) {
        onInputClear();
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const onNavigateToUser = (uid: string) => () => {
    navigate(`/${uid}`);
    onInputClear();
  };

  return (
    <>
      <div className={styles.search}>
        <svg
          className={styles.searchIcon}
          fill="#8E8E8E"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="18px"
          height="18px">
          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
        </svg>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            dispatch(fetchSearchingUsers(searchValue));
          }}
        />
        {searchValue && (
          <svg
            className={styles.cancelIcon}
            onClick={onInputClear}
            fill="#C8C8C8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="18px"
            height="18px">
            <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16.414,15 c0,0,3.139,3.139,3.293,3.293c0.391,0.391,0.391,1.024,0,1.414c-0.391,0.391-1.024,0.391-1.414,0C18.139,19.554,15,16.414,15,16.414 s-3.139,3.139-3.293,3.293c-0.391,0.391-1.024,0.391-1.414,0c-0.391-0.391-0.391-1.024,0-1.414C10.446,18.139,13.586,15,13.586,15 s-3.139-3.139-3.293-3.293c-0.391-0.391-0.391-1.024,0-1.414c0.391-0.391,1.024-0.391,1.414,0C11.861,10.446,15,13.586,15,13.586 s3.139-3.139,3.293-3.293c0.391-0.391,1.024-0.391,1.414,0c0.391,0.391,0.391,1.024,0,1.414C19.554,11.861,16.414,15,16.414,15z" />
          </svg>
        )}
      </div>
      {searchValue && (
        <div className={styles.modal} ref={modalRef}>
          {searchingUsers.map((user) => (
            <div className={styles.user} key={user.uid} onClick={onNavigateToUser(user.uid)}>
              <ProfileImage size={45} imageUrl={user.imageUrl} />
              <p>{user.username}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
