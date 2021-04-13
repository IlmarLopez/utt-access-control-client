/** VUEX module for auth management */
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('access_token') || '',
    status: '',
    authenticatedUser: null,
    roles: [],
  },
  getters: {
    authenticatedUser: (state) => state.authenticatedUser,
    isAutenticated: (state) => !!state.token,
    accessToken: (state) => state.token,
    authStatus: (state) => state.status,
    roles: (state) => state.roles,
  },
  mutations: {
    CREATE_SESSION: (state, user) => {
      state.roles.push(user.role_name);
      state.authenticatedUser = { ...user };
    },
    DESTROY_SESSION: (state) => {
      localStorage.removeItem('access_token'); // if the request fails, remove any possible user token if possible
      state.token = '';
      Vue.prototype.$ability.update([]);
      state.roles = [];
      state.authenticatedUser = null;
    },
    AUTH_REQUEST: (state) => {
      state.status = 'loading';
    },
    AUTH_SUCCESS: (state, token) => {
      state.status = 'success';
      state.token = token;
      localStorage.setItem('access_token', token); // store the token in localstorage
    },
    AUTH_ERROR: (state) => {
      state.status = 'error';
      localStorage.removeItem('access_token'); // if the request fails, remove any possible user token if possible
    },
  },
  actions: {
    AUTH_REQUEST({ commit }, user) {
      return new Promise((resolve, reject) => {
        // The Promise used for router redirect in login
        commit('AUTH_REQUEST');
        Vue.prototype
          .$http({ url: 'login', data: user, method: 'POST' })
          .then((res) => {
            const token = res.data.access_token;
            commit('AUTH_SUCCESS', token);
            // you have your token, now log in your user :)
            resolve(res);
          })
          .catch((err) => {
            commit('AUTH_ERROR', err);
            reject(err);
          });
      });
    },
    AUTH_LOGOUT({ commit }) {
      return new Promise((resolve) => {
        commit('DESTROY_SESSION');
        resolve();
      });
    },
    USER_REQUEST({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.prototype
          .$http({ url: 'users/me', method: 'GET' })
          .then((res) => {
            commit('CREATE_SESSION', res.data);
            resolve(res);
          })
          .catch((err) => {
            commit('DESTROY_SESSION');
            reject(err);
          });
      });
    },
  },
};
