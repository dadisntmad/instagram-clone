import React from 'react';
import ContentLoader from 'react-content-loader';

export const ProfileLoader: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={1005}
      height={150}
      viewBox="-60 0 1005 150"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="115" y="658" rx="0" ry="0" width="0" height="1" />
      <circle cx="89" cy="75" r="75" />
      <rect x="196" y="24" rx="0" ry="0" width="144" height="18" />
      <rect x="351" y="18" rx="4" ry="4" width="90" height="30" />
      <rect x="199" y="80" rx="0" ry="0" width="241" height="21" />
      <rect x="199" y="129" rx="0" ry="0" width="241" height="21" />
    </ContentLoader>
  );
};
