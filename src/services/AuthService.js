import api from '../config/api';

import * as LocalStorageService from './LocalStorageService';

const setCurrentUser = userData => {
  api.setHeader('Authorization', userData.token);
  LocalStorageService.setSessionToken(userData);
};

const removeCurrentUser = () => LocalStorageService.removeSessionToken();

const login = userData => api.post('users/sessions', userData);

export default {
  login,
  setCurrentUser,
  removeCurrentUser
};
