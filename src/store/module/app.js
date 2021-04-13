/** VUEX module for app management */

export default {
  namespaced: true,
  state: {
    // initial state
    processing: false,
    sidebar: {
      isCollapsed: localStorage.getItem('sidebarStatus')
        ? !!+localStorage.getItem('sidebarStatus')
        : true,
    },
    verticalNavMenuItemsMin: localStorage.getItem('sidebarStatus')
      ? !!+localStorage.getItem('sidebarStatus')
      : true,
  },
  getters: {
    // getters
    processing: (state) => state.processing,
    sidebar: (state) => state.sidebar,
    verticalNavMenuItemsMin: (state) => state.verticalNavMenuItemsMin,
  },
  mutations: {
    UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN(state, val) {
      state.verticalNavMenuItemsMin = val;
    },
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.isCollapsed = !state.sidebar.isCollapsed;
      if (state.sidebar.isCollapsed) {
        state.verticalNavMenuItemsMin = true;
        localStorage.setItem('sidebarStatus', 1);
      } else {
        state.verticalNavMenuItemsMin = false;
        localStorage.setItem('sidebarStatus', 0);
      }
    },
    // mutations
    START_PROCESSING(state) {
      state.processing = true;
    },
    STOP_PROCESSING(state) {
      state.processing = false;
    },
  },
  actions: {
    // actions
    TOGGLE_SIDEBAR({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
    UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN({ commit }, value) {
      commit('UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN', value);
    },
  },
};
