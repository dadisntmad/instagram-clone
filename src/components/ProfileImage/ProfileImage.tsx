import React from 'react';

import defaultImage from '../../assets/default.jpg';

type ProfileImageProps = {
  size: number;
  imageUrl?: string;
};

export const ProfileImage: React.FC<ProfileImageProps> = ({ size, imageUrl }) => {
  return (
    <img
      src={imageUrl ? imageUrl : defaultImage}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
        padding: 2,
        border: '1px solid #DBDBDB',
        cursor: 'pointer',
      }}
      alt="user"
    />
  );
};
