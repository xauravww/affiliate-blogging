import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-3 border-neutral-200 border-t-primary-500 mb-4`}></div>
      <p className="text-neutral-600 font-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
