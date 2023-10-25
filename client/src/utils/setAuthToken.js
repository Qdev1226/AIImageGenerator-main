import authService from '../services/authService';
import imgService from '../services/apiService';

// store our JWT in LS and set axios headers if we do have a token
const setAuthToken = (token) => {
  if (token) {
    authService.setTokenInHeader(token);
    imgService.setTokenInHeader(token);
    localStorage.setItem('token', token);
  } else {
    authService.removeTokenInHeader();
    imgService.removeTokenInHeader();
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
