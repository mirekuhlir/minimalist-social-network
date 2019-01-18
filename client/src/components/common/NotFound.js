import React from 'react';
import './NotFound.scss';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="not-found">
      <p>Profile not found.</p>
      <Link className="common-button" to="/profiles">
        View profiles
      </Link>
    </div>
  );
};
