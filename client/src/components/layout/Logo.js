import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <ul className="navbar__items">
          <li className="navbar__item">
            <Link to="/"> Home</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Logo;
