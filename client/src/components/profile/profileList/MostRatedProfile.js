import React, { Component } from 'react';
import './MostRatedProfile.scss';
import ProfileCard from './ProfileCard';
import Loading from '../../common/Loading';
import { getMostRatedProfile } from '../../../appState/actions/profileActions';
import { connect } from 'react-redux';

class TheMostRatedProfile extends Component {
  componentDidMount() {
    //get most rated profiles
    this.props.getMostRatedProfile(3);
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
            key={profile._id}
            user_id={profile.user._id}
            {...profile}
          />
        ));
      } else {
        profilesItems = <h3>No profiles found...</h3>;
      }
    }

    return (
      <div className="most-rated-profile">
        <div className="most-rated-profile__title">The most rated profiles</div>
        <div className="most-rated-profile__container"> {profilesItems}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getMostRatedProfile }
)(TheMostRatedProfile);
