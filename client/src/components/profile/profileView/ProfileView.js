import React, { Component } from 'react';
import './ProfileView.scss';
import Hobby from './Hobby';
import test_photo_a from '../../../images/human_avatar.png';
import { addLike, removeLike } from '../../../appState/actions/profileActions';
import { connect } from 'react-redux';
import LikeButton from './LikeButton';

class ProfileView extends Component {
  render() {
    let hobbies = this.props.hobbies.map(hobbyItem => (
      <Hobby key={hobbyItem._id} hobby={hobbyItem.hobby} />
    ));

    return (
      <div className="profile-view">
        <div className="profile-view__window">
          <div className="profile-view__name">{this.props.name}</div>
          <div className="profile-view__photo-container">
            <img
              src={test_photo_a}
              className="profile-view__photo"
              alt="test_photo_a"
            />
          </div>
          <LikeButton profile_id={this.props._id} likes={this.props.likes} />
          <div className="profile-view__title">About me</div>
          <div className="profile-view__about-me-text">{this.props.about}</div>
          <div className="profile-view__title">Hobbies</div>
          <div className="profile-view__hobbies"> {hobbies}</div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(
  null,
  { addLike, removeLike }
)(ProfileView);
