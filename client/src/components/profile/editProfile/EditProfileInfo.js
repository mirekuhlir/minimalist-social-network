import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EditProfileInfo.scss';
import TextArea from '../../common/TextArea';
import { createOrEditProfile } from '../../../appState/actions/profileActions';
import isEmpty from '../../../misc/isEmpty';

import TextInput from '../../common/TextInput';

class EditProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      showSaveButton: false,
      name: '',
      about: '',
      errors: {}
    };

    this.onChangeProfile = this.onChangeProfile.bind(this);
    this.onSubmitProfile = this.onSubmitProfile.bind(this);
  }

  // state in redux store is changed, props are set via mapStateToProps
  // then getDerivedStateFromProps (componentWillReceiveProps) is called
  // also getDerivedStateFromProps is called on local component state change
  static getDerivedStateFromProps(nextProps, currentState) {
    // currentState.editing === false - onChange set state  and then getDerivedStateFromProps is called so
    // we want to prevent rewriting local state by state from redux
    if (
      nextProps.profile.profile != null &&
      currentState.isEditing === false &&
      Object.keys(nextProps.errors).length === 0 &&
      // on save button is changed state, so getDeliverStateFromProps is called and
      // we do not want rewrite input by current state from redux
      nextProps.profile.saving === false
    ) {
      const profile = nextProps.profile.profile;

      // we need to sync state and value in input otherwise we are switchning between
      // controlled and uncontrolled component
      profile.name = !isEmpty(profile.name)
        ? profile.name
        : (profile.name = '');
      profile.about = !isEmpty(profile.about)
        ? profile.about
        : (profile.about = '');

      return {
        name: profile.name,
        about: profile.about,
        //name input feedback errors - name length...
        errors: {}
      };
    }

    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }

    return null;
  }

  onChangeProfile(e) {
    this.setState({
      [e.target.name]: e.target.value,
      isEditing: true,
      showSaveButton: true
    });
  }

  onSubmitProfile() {
    const profileData = {
      name: this.state.name,
      about: this.state.about
    };

    this.props.createProfile(profileData);

    this.setState({
      showSaveButton: false
    });

    this.setState({ isEditing: false });
  }

  render() {
    const { errors } = this.state;

    let saveButton = null;

    // hide or show button, on save hide button but keep space
    if (this.state.showSaveButton === true) {
      saveButton = (
        <button onClick={this.onSubmitProfile} className="common-button">
          Save
        </button>
      );
    }

    return (
      <div className="edit-profile-info">
        <div className="edit-profile__title">Name</div>
        <TextInput
          inputType="text"
          placeholder="Write name or nickname"
          name="name"
          value={this.state.name}
          onChange={this.onChangeProfile}
          error={errors.name}
        />
        <div className="common__space--h-1rem" />
        <div className="edit-profile__title">About me</div>
        <TextArea
          placeholder="Write something about you"
          name="about"
          value={this.state.about}
          onChange={this.onChangeProfile}
          error={errors.about}
        />
        <div className="common__space--h-1rem" />
        <div className="common__space--h-2-5rem">{saveButton}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return {
    createProfile: profileData => dispatch(createOrEditProfile(profileData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileInfo);
