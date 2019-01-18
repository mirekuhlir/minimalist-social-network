import React, { Component } from 'react';
import './Hobby.scss';

class Hobby extends Component {
  render() {
    return <div className="hobby">{this.props.hobby}</div>;
  }
}

export default Hobby;
