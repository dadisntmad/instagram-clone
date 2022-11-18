import React from 'react';
import ContentLoader from 'react-content-loader';

export const PostLoader: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={470}
      height={800}
      viewBox="0 70 470 800"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="22" cy="113" r="22" />
      <rect x="61" y="106" rx="8" ry="8" width="98" height="14" />
      <rect x="0" y="161" rx="0" ry="0" width="470" height="770" />
      <rect x="115" y="658" rx="0" ry="0" width="0" height="1" />
    </ContentLoader>
  );
};
