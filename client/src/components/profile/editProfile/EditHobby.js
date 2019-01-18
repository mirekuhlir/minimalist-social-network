import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EditHobby.scss';
import isEmpty from '../../../misc/isEmpty';

import {
  addHobby,
  deleteHobby
} from '../../../appState/actions/profileActions';

import TextInput from '../../common/TextInput';
import HobbyButton from './HobbyButton';

class EditHobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      showAddHobbyButton: false,
      hobby: '',
      hobbies: []
    };

    this.onChangeHobby = this.onChangeHobby.bind(this);
    this.onSubmitHobby = this.onSubmitHobby.bind(this);
  }

  componentDidMount() {
    // this.props.getCurrentProfile();
  }

  // state in redux store is changed, props are set via mapStateToProps
  // then getDerivedStateFromProps (componentWillReceiveProps) is called
  static getDerivedStateFromProps(nextProps, currentState) {
    // currentState.editing === false - onChange set state  and then getDerivedStateFromProps is called so
    // we want to prevent rewriting local component state by state from redux
    if (
      nextProps.profile.profile != null &&
      currentState.isEditing === false &&
      Object.keys(nextProps.errors).length === 0
    ) {
      const profile = nextProps.profile.profile;

      profile.hobbies = !isEmpty(profile.hobbies)
        ? profile.hobbies
        : (profile.hobbies = []);

      return {
        hobbies: profile.hobbies,
        //max number of hobbies error...
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

  onChangeHobby(e) {
    this.setState({
      [e.target.name]: e.target.value,
      isEditing: true,
      showAddHobbyButton: true
    });
  }

  onSubmitHobby() {
    const hobbyData = {
      hobby: this.state.hobby
    };

    this.setState({ hobby: '', isEditing: false, showAddHobbyButton: false });

    this.props.addHobby(hobbyData);
  }

  onDeleteClickHobby(id) {
    this.props.deleteHobby(id);
  }

  render() {
    const { errors, hobbies } = this.state;

    let hobbiesList;

    hobbiesList = hobbies.map(hobbyItem => (
      <HobbyButton
        key={hobbyItem._id}
        hobby={hobbyItem.hobby}
        onDeleteClick={this.onDeleteClickHobby.bind(this, hobbyItem._id)}
      />
    ));

    let addHobbyButton = null;

    if (this.state.showAddHobbyButton === true) {
      addHobbyButton = (
        <button onClick={this.onSubmitHobby} className="common-button">
          Add hobby
        </button>
      );
    }

    return (
      <div className="edit-hobby">
        <div className="edit-hobby__title">Hobbies</div>
        <TextInput
          inputType="text"
          placeholder="Write an hobby"
          name="hobby"
          value={this.state.hobby}
          onChange={this.onChangeHobby}
          error={errors.hobby}
        />
        <div className="common__space--h-1rem" />
        <div className="common__space--h-2-5rem">{addHobbyButton}</div>
        <div className="edit-hobby__hobby-list">{hobbiesList}</div>
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
    addHobby: hobbyData => dispatch(addHobby(hobbyData)),
    deleteHobby: id => dispatch(deleteHobby(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditHobby);
