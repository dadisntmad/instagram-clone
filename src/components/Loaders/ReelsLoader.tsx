import React from 'react';
import ContentLoader from 'react-content-loader';

export const ReelsLoader: React.FC = () => {
  return (
    <ContentLoader
      style={{ width: 470 }}
      speed={2}
      width={470}
      height={120}
      viewBox="0 0 470 120"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="0" y="0" rx="8" ry="8" width="470" height="120" />
    </ContentLoader>
  );
};
