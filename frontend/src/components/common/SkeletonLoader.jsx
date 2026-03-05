import React from 'react';

const SkeletonLoader = ({ type = 'card' }) => {
  const classes = {
    card: 'bg-gray-200 animate-pulse rounded-xl shadow h-48 mb-4',
    text: 'bg-gray-200 animate-pulse rounded h-4 mb-2',
    avatar: 'bg-gray-200 animate-pulse rounded-full h-10 w-10',
    button: 'bg-gray-200 animate-pulse rounded h-10 w-full',
  };

  return <div className={classes[type]}></div>;
};

export default SkeletonLoader;