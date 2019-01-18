import React, { Component } from 'react';
import './ProfileList.scss';
import ProfileCard from './ProfileCard';
import Loading from '../../common/Loading';
import { getProfilesList } from '../../../appState/actions/profileActions';
import { connect } from 'react-redux';

class ProfileList extends Component {
  componentDidMount() {
    this.props.getProfilesList();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profilesItems;

    if (profiles === null || loading) {
      profilesItems = <Loading />;
    } else {
      if (profiles.length > 0) {
        profilesItems = profiles.map(profile => (
          <ProfileCard
            key={profile.user._id}
            user_id={profile.user._id}
            {...profile}
          />
        ));
      } else {
        profilesItems = <h3>No profiles found...</h3>;
      }
    }

    return (
      <div className="profile-list">
        <div className="profiles-list__title">All profiles</div>
        <div className="profiles-list__container"> {profilesItems}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfilesList }
)(ProfileList);
