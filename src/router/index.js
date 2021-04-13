import Vue from 'vue';
import Router from 'vue-router';

import ifNotAuthenticated from '@/middleware/ifNotAuthenticated';

Vue.use(Router);

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    hidden: true,
    meta: {
      middleware: [ifNotAuthenticated],
      layout: 'FullPage',
    },
  },
  {
    path: '/404',
    component: () => import('@/views/not-found.vue'),
    hidden: true,
    meta: {
      layout: 'FullPage',
    },
  },
  {
    path: '/',
    redirect: '/home',
    hidden: true,
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/home',
    name: 'dashboard',
    component: () => import('@/views/dashboard.vue'),
    meta: {
      title: 'Home',
      roles: ['admin'],
      icon: 'fa-home',
      layout: 'Main',
    },
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "about" */ '../views/users/index.vue'),
    meta: {
      title: 'Usuarios',
      roles: ['admin'],
      icon: 'fa-users',
      layout: 'Main',
    },
  },
  {
    path: '/users/view/:id',
    name: 'userView',
    hidden: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/users/view.vue'),
    meta: {
      title: 'Detalles del usuario',
      roles: ['admin'],
      layout: 'Main',
      breadcrumb: [
        { title: 'Home', url: '/' },
        { title: 'Lista de usaurios', url: '/users' },
        { title: 'Detalles del usuario', active: true },
      ],
    },
  },
];

// prettier-ignore
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});

const router = createRouter();

export default router;
