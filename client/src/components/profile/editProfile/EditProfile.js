import React, { Component } from 'react';
import './EditProfile.scss';
import { Link } from 'react-router-dom';
import EditHobby from './EditHobby';
import EditProfileInfo from './EditProfileInfo';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../appState/actions/profileActions';

class EditProfile extends Component {
  componentDidMount() {
    //get user profile
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;

    let backButton = null;

    //profile can be null or empty object
    if (
      profile !== null &&
      Object.keys(profile).length > 0 &&
      loading === false
    ) {
      backButton = (
        <Link className="common-button" to="/my-profile">
          Back to my profile
        </Link>
      );
    }

    return (
      <div className="edit-profile">
        <div className="edit-profile__window">
          <EditProfileInfo />
          <EditHobby />
        </div>
        <div className="common__space--h-2-5rem">{backButton}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch => {
  return {
    getCurrentProfile: () => dispatch(getCurrentProfile())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
