import store from '../appState/store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthorizationToken';
import { setCurrentUser, logoutUser } from '../appState/actions/userActions';
import { clearCurrentProfile } from '../appState/actions/profileActions';

export default function userAuthorization() {
  // if user refresh page, user is logged out, we need load token from local storage to keep user logged
  if (localStorage.jwt) {
    // set token to header, token is saved in local storage on user login
    setAuthToken(localStorage.jwt);
    // decode token and get user info and expiration
    const decoded = jwt_decode(localStorage.jwt);
    // set user and set isAuthenticated to true
    store.dispatch(setCurrentUser(decoded));
    // check for expired token
    // convert miliseconds to seconds
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      // clear current Profile
      store.dispatch(clearCurrentProfile());
      // logout user
      store.dispatch(logoutUser());

      // redirect , change current url location
      window.location.href = '/login';
    }
  }
}
