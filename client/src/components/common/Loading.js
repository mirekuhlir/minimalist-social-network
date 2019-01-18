import React from 'react';
import './Loading.scss';

export default () => {
  return (
    <div className="loading">
      <div className="spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    </div>
  );
};
