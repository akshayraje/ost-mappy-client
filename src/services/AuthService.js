import { apiRoot } from '../constants';
import axios from 'axios/index';
import cookie from 'react-cookies';

function AuthService() {
  let isAuthorized = false;

  this.getAuthStatus = function() {
    return isAuthorized;
  };

  this.signIn = function(params, successCallback) {
    axios
      .post(`${window.apiRoot || apiRoot}login`, {
        username: params.username,
        password: params.password
      })
      .then((res) => {
        if (res.data.success) {
          isAuthorized = true;
          successCallback();
        } else {
          console.log('Unauthorized user!');
          isAuthorized = false;
        }
      })
      .catch((err) => {
        console.log(err);
        isAuthorized = false;
      });
  };

  this.signOut = function() {
    cookie.remove('fe_logIn');
    isAuthorized = false;
  };

  (function() {
    isAuthorized = cookie.load('fe_logIn');
  })();
}

export default new AuthService();
