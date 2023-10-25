import authApi from '../api/authApi';

// store our JWT in LS and set axios headers if we do have a token
const setAuthToken = (token) => {
  if (token) {
    // authApi.setTokenInHeader(token);
    localStorage.setItem('token', token);
  } else {
    authApi.removeTokenInHeader();
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
