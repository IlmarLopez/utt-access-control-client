/** VUEX module for contract management */
import Vue from 'vue';
import { Message } from 'element-ui';

export default {
  namespaced: true,
  state: {
    // initial state
    entities: {},
    list: [],
    paginatedList: {},
  },
  getters: {
    // getters
    /**
     * Return array of resources.
     */
    list: (state) => state.list.map((id) => state.entities[id.toString()]),
    /**
     * Get resource by id.
     */
    byId: (state) => (id) => state.entities[id.toString()],
    /**
     * Get pagination of list.
     */
    paginatedList: (state) => ({ ...state.paginatedList }),
  },
  mutations: {
    // mutations
    FETCH_LIST_SUCCESS: (state, response) => {
      const { data } = response;

      data.items.forEach((m) => {
        Vue.set(state.entities, m.id.toString(), m);
      });

      state.paginatedList = {
        page: data.page,
        per_page: data.per_page,
        page_count: data.page_count,
        total_count: data.total_count,
      };

      state.list = data.items.map((m) => m.id.toString());
    },
    FETCH_LIST_ERROR: (state) => {
      state.list = [];
      state.paginatedList = {};
    },
    FETCH_SINGLE_SUCCESS: (state, response) => {
      const { data } = response;
      const id = data.id.toString();

      Vue.set(state.entities, id, data);
    },
    FETCH_CREATE_SUCCESS: (state, response) => {
      const { data } = response;
      if (data) {
        const id = data.id.toString();
        state.list.push(id.toString());
        Vue.set(state.entities, id, data);
      }
      Message.success('Successfully completed');
    },
    FETCH_CREATE_ERROR: (_, error) => {
      Message.error(`'Status code' ${error.response.status}`);
    },
    FETCH_UPDATE_SUCCESS: (state, response) => {
      const { data } = response;
      const id = data.id.toString();

      Vue.set(state.entities, id, data);

      const listIndex = state.list.indexOf(id);

      if (listIndex >= 0) {
        Vue.set(state.list, listIndex, id);
      }

      Message.success('Successfully completed');
    },
    FETCH_UPDATE_ERROR: (_, error) => {
      Message.error(`'Status code' ${error.response.status}`);
    },
    FETCH_DELETE_SUCCESS: (state, id) => {
      const listIndex = state.list.indexOf(id.toString());

      if (listIndex >= 0) {
        Vue.delete(state.list, listIndex);
      }

      Vue.delete(state.entities, id.toString());
      Message.success('Successfully completed');
    },
    FETCH_DELETE_ERROR: (_, error) => {
      Message.error(`'Status code' ${error.response.status}`);
    },
  },
  actions: {
    // actions
    FETCH_LIST({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.prototype
          .$http({
            url: 'careers',
            method: 'GET',
          })
          .then((response) => {
            resolve(response);
            commit('FETCH_LIST_SUCCESS', response);
          })
          .catch((err) => {
            reject(err);
            commit('FETCH_LIST_ERROR', err);
          });
      });
    },
    FETCH_SINGLE({ commit }, id) {
      return new Promise((resolve, reject) => {
        Vue.prototype
          .$http({ url: `careers/${id}`, method: 'GET' })
          .then((response) => {
            resolve(response);
            commit('FETCH_SINGLE_SUCCESS', response);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
    FETCH_CREATE({ commit }, payload) {
      return new Promise((resolve, reject) => {
        Vue.prototype
          .$http({ url: 'careers', data: payload.data, method: 'POST' })
          .then((response) => {
            resolve(response);
            commit('FETCH_CREATE_SUCCESS', response);
          })
          .catch((err) => {
            reject(err);
            commit('FETCH_CREATE_ERROR', err);
          });
      });
    },
    FETCH_UPDATE({ commit }, payload) {
      return new Promise((resolve, reject) => {
        Vue.prototype
          .$http({
            url: `careers/${payload.id}`,
            data: payload.data,
            method: 'PUT',
          })
          .then((response) => {
            resolve(response);
            commit('FETCH_UPDATE_SUCCESS', response);
          })
          .catch((err) => {
            reject(err);
            commit('FETCH_UPDATE_ERROR', err);
          });
      });
    },
    FETCH_DELETE({ commit }, id) {
      return new Promise((resolve, reject) => {
        Vue.prototype
          .$http({ url: `careers/${id}`, method: 'DELETE' })
          .then((response) => {
            resolve(response);
            commit('FETCH_DELETE_SUCCESS', id);
          })
          .catch((err) => {
            reject(err);
            commit('FETCH_DELETE_ERROR', err);
          });
      });
    },
  },
};
