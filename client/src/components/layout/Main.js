import React, { Component } from 'react';
import './Main.scss';

class Main extends Component {
  render() {
    return <main className="main">{this.props.children}</main>;
  }
}

export default Main;
