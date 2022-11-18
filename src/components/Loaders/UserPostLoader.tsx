import React from 'react';
import ContentLoader from 'react-content-loader';

export const UserPostLoader: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={293}
      height={293}
      viewBox="0 0 293 293"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="0" y="0" rx="0" ry="0" width="293" height="293" />
    </ContentLoader>
  );
};
