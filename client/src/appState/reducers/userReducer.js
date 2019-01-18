import isEmpty from '../../misc/isEmpty';

import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

//user login
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      //return modified state
      return {
        //copy state
        ...state,
        //action.payload contain user from decoded token
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
