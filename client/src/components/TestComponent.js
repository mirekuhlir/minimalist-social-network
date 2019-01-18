import React, { Component } from 'react';
import axios from 'axios';
import './TestComponent.scss';

export default class TestComponent extends Component {
  state = {
    profiles: []
  };

  componentDidMount() {
    axios
      .get('/api/profile/all')
      .then(res => this.setState({ profiles: res.data }));
  }

  render() {
    return (
      <div className="test-component">
        <ul>
          {this.state.profiles.map(profile => (
            <li key={profile._id}>{profile._id}</li>
          ))}
        </ul>
      </div>
    );
  }
}
