import React, { Component } from 'react';
import './Login.scss';
import TextInput from '../common/TextInput';
import { connect } from 'react-redux';
import { loginUser, clearErrors } from '../../appState/actions/userActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //if we are logged in, we can not visit /login we are redirected to home page
  componentDidMount() {
    this.props.clearErrors();

    if (this.props.userAuth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  //state in redux store is changed, props are set via mapStateToProps,
  //then  getDerivedStateFromProps (componentWillReceiveProps) is called
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.userAuth.isAuthenticated) {
      //after logged in we are redirected
      nextProps.history.push('/my-profile');
    }
    if (nextProps.errors) {
      //for example user wrote wrong email, error messaeg is displayed to user
      return {
        errors: nextProps.errors
      };
    }
  }

  onSubmit(e) {
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="common-form">
          <div className="common-form__title">Login</div>
          <div className="common-form-group">
            <TextInput
              placeholder="Email Address"
              name="email"
              inputType="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />

            <TextInput
              placeholder="Password"
              name="password"
              inputType="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />

            <button
              type="button"
              onClick={this.onSubmit}
              className="common-form__button"
            >
              Login
            </button>
          </div>

          <div className="common-form__note">
            Do not have an account?&nbsp; <a href="/registration">Sign Up</a>
            <br />
            Or you can use test@test.com with password 123456
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return {
    loginUser: userData => dispatch(loginUser(userData)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
