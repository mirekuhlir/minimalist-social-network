import axios from 'axios';

//caled afterer player is logged in, we receive token in response from server
//also called from action logoutUser
const setAuthToken = token => {
  if (token) {
    //apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    //delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
