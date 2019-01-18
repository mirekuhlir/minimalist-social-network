import axios from 'axios';
import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from './types';

import setAuthToken from '../../authUtils/setAuthorizationToken';
import jwt_decode from 'jwt-decode';

//user registration
//called as redux thunk
export const registerUser = (userData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/users/register', userData)
    //redirect with react router after user made registration
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        //set error into redux state
        payload: err.response.data
      })
    );
};

//login action, get token from server
//called as redux thunk
export const loginUser = userData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //token in response from server
      const { token } = res.data;
      //save token to local storage
      localStorage.setItem('jwt', token);
      //set token to Auth header
      //token contains user name, id...
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user to redux state
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set logged user in redux state
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const testAction = () => dispatch => {
  console.log('test');
  dispatch(clearErrors());
};

//logout user
export const logoutUser = history => dispatch => {
  //remove token from localStorage
  localStorage.removeItem('jwt');
  //remove auth header
  setAuthToken(false);
  //isAuthenticated will set to false
  dispatch(setCurrentUser({}));
  // history.push('/')
};

// clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
