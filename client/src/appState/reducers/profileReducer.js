import {
  GET_PROFILE,
  PROFILE_LOADING,
  PROFILE_SAVING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
  GET_MOST_RATED_PROFILE
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
  saving: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_SAVING:
      return {
        ...state,
        saving: true
      };

    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_MOST_RATED_PROFILE:
      // console.log(action.payload);
      return {
        ...state,
        profiles: action.payload,
        loading: false,
        saving: false
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        saving: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
        saving: false
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };

    default:
      return state;
  }
}
