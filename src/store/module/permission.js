/** VUEX module for auth management */
import { asyncRoutes, constantRoutes } from '@/router';

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  }
  return true;
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

export default {
  namespaced: true,
  state: {
    routes: [],
    addedRoutes: [],
  },
  getters: {
    allowedRoutes: (state) => state.routes,
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addedRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    },
    REMOVE_ROUTES: (state) => {
      state.addedRoutes = [];
      state.routes = [];
    },
  },
  actions: {
    GENERATE_ROUTES({ commit }, roles) {
      return new Promise((resolve) => {
        const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        commit('SET_ROUTES', accessedRoutes);
        resolve(accessedRoutes);
      });
    },
  },
};
