// called from App.js on path /profile/:user_id

import React, { Component } from 'react';
import './ProfilePage.scss';

import { Link } from 'react-router-dom';
import ProfileView from './profileView/ProfileView';

import {
  getProfileByUserId,
  clearErrors,
  getProfilesList
} from '../../appState/actions/profileActions';
import { connect } from 'react-redux';
import Loading from '../common/Loading';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../misc/isEmpty';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getProfileByUserId(this.props.match.params.user_id);
    this.props.getProfilesList();
  }

  //get next profile user index
  getNextUserID(profiles, user_id) {
    const profileIndex = profiles
      .map(
        item =>
          //get index of profile in array
          item.user._id
      )
      .indexOf(user_id);

    let nextUserID;
    //next profile
    if (profileIndex < profiles.length - 1) {
      nextUserID = profiles[profileIndex + 1].user._id;
    } else {
      nextUserID = profiles[0].user._id;
    }

    return nextUserID;
  }

  // state in redux store is changed, props are set via mapStateToProps,
  // then getDerivedStateFromProps (componentWillReceiveProps) is called
  static getDerivedStateFromProps(nextProps) {
    if (Object.keys(nextProps.errors).length > 0) {
      if (nextProps.errors['noprofile']) {
        //nextProps.clearErrors();
        nextProps.history.push('/not-found');

        return {
          errors: nextProps.errors
        };
      }
    }
    return null;
  }

  render() {
    const { profile, profiles, loading } = this.props.profile;

    let profileContent;
    let nextUserID;

    //render is called before componentDidMount
    if (
      profile === null ||
      isEmpty(profiles) ||
      loading ||
      typeof profile.user === 'undefined'
    ) {
      profileContent = <Loading />;
    } else {
      nextUserID = this.getNextUserID(profiles, profile.user._id);
      profileContent = (
        <div>
          <ProfileView {...profile} />
          <div className="profile-page__buttons">
            <Link className="common-button" to="/profiles">
              View all profiles
            </Link>
            <Link className="common-button" to={`/profile/${nextUserID}`}>
              Next profile
            </Link>
          </div>
        </div>
      );
    }

    return <div className="profile-page">{profileContent}</div>;
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  userAuth: state.userAuth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProfileByUserId, clearErrors, getProfilesList }
)(withRouter(ProfilePage));
