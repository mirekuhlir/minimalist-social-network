import React, { Component } from 'react';
import './HomePage.scss';
import MostRatedProfile from '../profile/profileList/MostRatedProfile';

class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <MostRatedProfile />
      </div>
    );
  }
}

export default HomePage;
