import api from '../config/api';

import * as LocalStorageService from './LocalStorageService';

const setCurrentUser = userData => {
  api.setHeader('Authorization', userData.token);
  LocalStorageService.setSessionToken(userData);
};

const removeCurrentUser = () => LocalStorageService.removeSessionToken();

// const login = userData => api.post('loginFalanet', userData);

const login = userData =>
  new Promise(resolve => {
    setTimeout(() => {
      const data = {
        ...userData,
        token: 'token'
      };
      resolve({ ok: true, data });
    }, 1500); // eslint-disable-line no-magic-numbers
  });

export default {
  login,
  setCurrentUser,
  removeCurrentUser
};
