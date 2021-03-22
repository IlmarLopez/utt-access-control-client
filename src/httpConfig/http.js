/**
 * ajaxRequest configurations
 */
import axios from 'axios';
import apiUrl from './api';
import store from '../store';

// create an axios instance
const service = axios.create({
  baseURL: apiUrl, // process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000000, // request timeout
});

// Routing request interception
// http request Interceptor
service.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
    // Determine if there is a tiket. If it exists, then every HTTP header is added to tiket.
    if (store.getters['auth/isAutenticated']) {
      // eslint-disable-next-line no-param-reassign
      config.headers.common.Authorization = `Bearer ${store.getters['auth/accessToken']}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Routing response interception
// http response Interceptor
service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // return the error code 401 to clear the tiket information and jump to the login page.
      store.dispatch('auth/AUTH_LOGOUT').then(() => {
        if (window.location.hash !== '#/login') {
          // window.location.href = '/';
          window.location.reload();
        }
      });
    }
    return Promise.reject(error);
  },
);
export default service;
