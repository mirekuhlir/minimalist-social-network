import React, { Component } from 'react';
import './HobbyButton.scss';

class HobbyButton extends Component {
  render() {
    return (
      <button className="hobby-button" onClick={this.props.onDeleteClick}>
        {this.props.hobby}
      </button>
    );
  }
}

export default HobbyButton;
