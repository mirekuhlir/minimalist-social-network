import React, { Component } from 'react';
import './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        &copy; {new Date().getFullYear()} minimalist-social-network
      </footer>
    );
  }
}

export default Footer;
