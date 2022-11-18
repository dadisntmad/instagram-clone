import React from 'react';
import ContentLoader from 'react-content-loader';

export const SuggestionsLoader: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={320}
      height={400}
      viewBox="0 0 320 400"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="115" y="658" rx="0" ry="0" width="0" height="1" />
      <rect x="0" y="0" rx="0" ry="0" width="320" height="928" />
    </ContentLoader>
  );
};
