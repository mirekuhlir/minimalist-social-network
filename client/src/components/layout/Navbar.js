import React, { Component } from 'react';

import './Navbar.scss';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../appState/actions/userActions';
import { clearCurrentProfile } from '../../appState/actions/profileActions';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  constructor() {
    super();
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    this.props.history.push('/');
  }

  render() {
    const { isAuthenticated } = this.props.userAuth;
    let navbarRight = null;

    if (isAuthenticated === true) {
      navbarRight = (
        <ul className="navbar__items">
          <li className="navbar__item">
            <Link to="/my-profile">My Profile</Link>
          </li>
          <li className="navbar__item">
            <button
              type="button"
              className="navbar__buttton"
              onClick={this.onLogoutClick.bind(this)}
            >
              Logout{' '}
            </button>
          </li>
        </ul>
      );
    } else {
      navbarRight = (
        <ul className="navbar__items">
          <li className="navbar__item">
            <Link to="/registration">Sign Up</Link>
          </li>
          <li className="navbar__item">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }

    return (
      <div className="navbar">
        {/*left part of navbar*/}
        <>
          <ul className="navbar__items">
            <li className="navbar__item">
              <Link to="/profiles">Profiles</Link>
            </li>
          </ul>
        </>

        {/*right part of navbar - Sign Up Login or My Profile Logout*/}
        <>{navbarRight}</>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  userAuth: state.userAuth
});

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    clearCurrentProfile: () => dispatch(clearCurrentProfile())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
