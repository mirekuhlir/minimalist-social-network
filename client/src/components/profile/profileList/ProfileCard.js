import React, { Component } from 'react';
import './ProfileCard.scss';
import test_photo_a from '../../../images/human_avatar.png';
import { Link } from 'react-router-dom';

class ProfileCard extends Component {
  render() {
    return (
      <div className="profile-card">
        <Link
          className="profile-card__link"
          to={`/profile/${this.props.user_id}`}
        >
          <div className="profile-card__photo">
            <img src={test_photo_a} alt="test_photo_a" />
          </div>

          <div className="profile-card__name">{this.props.name}</div>
        </Link>
      </div>
    );
  }
}

export default ProfileCard;
