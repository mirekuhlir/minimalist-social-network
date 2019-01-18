// called from App.js on path /my-profile
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../appState/actions/profileActions';
import Loading from '../common/Loading';
import './MyProfile.scss';
import ProfileView from './profileView/ProfileView';

class MyProfile extends Component {
  componentDidMount() {
    //dispatch action to reducer function
    this.props.getCurrentProfile();
  }

  render() {
    // profile from redux store
    const { profile, loading } = this.props.profile;

    let componentContent;
    let profileLink = '';
    // loading data
    if (profile === null || loading) {
      componentContent = <Loading />;
    } else {
      // check if user has profile data and user
      if (typeof profile.user !== 'undefined') {
        profileLink = profile.user._id;
        componentContent = (
          <>
            {<ProfileView {...profile} />}
            <div className="my-profile__buttons">
              <Link className="common-button" to={`/profile/${profileLink}`}>
                View profile
              </Link>
              <Link className="common-button" to="/edit-profile">
                Edit profile
              </Link>
            </div>
          </>
        );
      } else {
        // user is loggedin but has not yet set up profile, profile is an empty object, redirect to edit-profile
        this.props.history.push('/edit-profile');
      }
    }

    return <div className="my-profile">{componentContent}</div>;
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  userAuth: state.userAuth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(MyProfile);
