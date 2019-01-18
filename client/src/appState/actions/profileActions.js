import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  GET_MOST_RATED_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  CLEAR_ERRORS,
  PROFILE_SAVING
} from './types';

//clear profile
//called from logout on navbar or after token expiration
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// get current profile
export function getCurrentProfile() {
  return async dispatch => {
    dispatch(clearErrors());
    dispatch(setProfileLoading());
    try {
      const res = await axios.get('/api/profile');
      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (error) {
      // user is registred but do not have setup profile
      // profile is empty object
      dispatch({ type: GET_PROFILE, payload: {} });
    }
  };
}

// create or edit profile
export const createOrEditProfile = profileData => dispatch => {
  dispatch(setProfileSaving());
  // if submit form previously show some errors, for example text field required, characters number
  dispatch(clearErrors());
  axios
    .post('/api/profile', profileData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get profile by user id - user id is from database
export function getProfileByUserId(user_id) {
  return async dispatch => {
    dispatch(clearErrors());
    dispatch(setProfileLoading());
    try {
      const res = await axios.get(`/api/profile/${user_id}`);
      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (error) {
      // profile is null
      dispatch({ type: GET_PROFILE, payload: null });
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };
}

export function addHobby(hobbyData) {
  return async dispatch => {
    dispatch(clearErrors());
    try {
      const res = await axios.post('/api/profile/hobby', hobbyData);
      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (error) {
      //response status 400
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };
}

export const deleteHobby = id => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/api/profile/hobby/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get all profiles
export function getProfilesList() {
  return async dispatch => {
    dispatch(clearErrors());
    dispatch(setProfileLoading());
    try {
      let res = await axios.get('/api/profile/all');
      dispatch({ type: GET_PROFILES, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_PROFILES, payload: null });
    }
  };
}

// get most rated profiles
export const getMostRatedProfile = numberOfProfiles => dispatch => {
  dispatch(clearErrors());
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/most-rated/${numberOfProfiles}`)
    .then(res => {
      dispatch({
        type: GET_MOST_RATED_PROFILE,
        payload: res.data
      });
    })

    .catch(err =>
      dispatch({
        type: GET_MOST_RATED_PROFILE,
        payload: null
      })
    );
};

// add like to profile
export const addLike = id => dispatch => {
  axios
    // id is profile id
    .post(`/api/profile/like/${id}`)
    // display likes
    .then(res => {
      //response is profile, we update redux state and then like is displayed on profile page
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// remove like from profile
export function removeLike(id) {
  return async dispatch => {
    try {
      const res = await axios.post(`/api/profile/unlike/${id}`);
      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };
}

//profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//profile saving - edit profile
export const setProfileSaving = () => {
  return {
    type: PROFILE_SAVING
  };
};

// clear input errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
