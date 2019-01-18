import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import './Registration.scss';
import { registerUser, clearErrors } from '../../appState/actions/userActions';
import { connect } from 'react-redux';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      password_match: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    //clear erros from invalid input
    this.props.clearErrors();
    //if we are logged in, we ca not vist http://localhost:3000/registertation
    //userAuth is from userAuth property in rootReducer
    if (this.props.userAuth.isAuthenticated) {
      //we are redirected
      this.props.history.push('/login');
    }
  }

  //update component state from new props
  static getDerivedStateFromProps(nextProps) {
    //errors are from redux state - mapStateToProps
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      password_match: this.state.password_match
    };
    //registerUser function from authAction
    //history is for redirection, come from withRouter
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="registration">
        <div className="common-form">
          <div className="common-form__title">Create account</div>
          {/* noValidate - disable HTML5 validation*/}
          <div className="common-form-group">
            <TextInput
              inputType="email"
              className="common-form__text-input"
              placeholder="Email Address"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />

            <TextInput
              inputType="password"
              className="form__text-input"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />

            <TextInput
              inputType="password"
              className="form__text-input"
              placeholder="Confirm Password"
              name="password_match"
              value={this.state.password_match}
              onChange={this.onChange}
              error={errors.password_match}
            />

            <button
              type="button"
              onClick={this.onSubmit}
              className="common-form__button"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

//authentication key in object will be a prop this.props.registerUser
//dispatch call registerUser (thunk), at the end thunk return action object
const mapDispatchToProps = dispatch => {
  return {
    registerUser: (newUser, history) =>
      dispatch(registerUser(newUser, history)),
    clearErrors: () => dispatch(clearErrors())
  };
};

//state from redux store to component props
const mapStateToProps = state => ({
  //userAuth key in object will be a prop this.props.userAuth
  //state.authentication is from rootReducer
  userAuth: state.userAuth,
  errors: state.errors
});
//connect redux and this component
export default connect(
  mapStateToProps,
  //withRouter is for redirect, now we can use this.props.history
  mapDispatchToProps
)(Registration);
//registerUser - map dispatch to props, registerUser is function in authAction,
//now we can call this function in this component via props - props.registerUser
