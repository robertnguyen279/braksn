import React from 'react';
import Loading from 'components/Loading';

const LoadingScreen = () => {
  return (
    <div style={{ zIndex: 99999999 }} className="absolute inset-0 flex justify-center top-64">
      <Loading />
    </div>
  );
};

export default LoadingScreen;
