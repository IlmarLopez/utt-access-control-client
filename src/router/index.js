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
    redirect: '/inicio',
    hidden: true,
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/inicio',
    name: 'home',
    component: () => import('@/views/dashboard.vue'),
    meta: {
      title: 'Inicio',
      roles: ['admin', 'guardia'],
      icon: 'fa-home',
      layout: 'Main',
    },
  },
  {
    path: '/usuarios',
    name: 'users',
    component: () => import(/* webpackChunkName: "about" */ '../views/users/index.vue'),
    meta: {
      title: 'Usuarios',
      roles: ['admin'],
      icon: 'fa-users',
      layout: 'Main',
      pageTitle: 'Lista de usuarios',
      breadcrumb: [
        { title: 'Inicio', url: '/' },
        { title: 'Usuarios' },
        { title: 'Lista', active: true },
      ],
    },
  },
  {
    path: '/usuarios/detalles/:id',
    name: 'userView',
    hidden: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/users/view.vue'),
    meta: {
      title: 'Detalles del usuario',
      roles: ['admin'],
      layout: 'Main',
      pageTitle: 'Detalles',
      breadcrumb: [
        { title: 'Inicio', url: '/' },
        { title: 'Lista de usaurios', url: '/usuarios' },
        { title: 'Detalles del usuario', active: true },
      ],
    },
  },
  {
    path: '/edificios',
    name: 'buildings',
    component: () => import(/* webpackChunkName: "about" */ '../views/buildings/index.vue'),
    meta: {
      title: 'Estado',
      roles: ['admin', 'guardia'],
      layout: 'Main',
      icon: 'el-icon-office-building',
      pageTitle: 'Estado',
      breadcrumb: [
        { title: 'Inicio', url: '/' },
        { title: 'Edificios' },
        { title: 'estado', active: true },
      ],
    },
  },
  {
    path: '/edificios/detalles/:id',
    name: 'buildingView',
    hidden: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/buildings/view.vue'),
    meta: {
      title: 'Detalles del edificio',
      roles: ['admin', 'guardia'],
      layout: 'Main',
      pageTitle: 'Detalles',
      breadcrumb: [
        { title: 'Inicio', url: '/' },
        { title: 'Edificios', url: '/edificios' },
        { title: 'Estado del edificio', active: true },
      ],
    },
  },
  {
    path: '/control-de-accesos',
    name: 'accessControl',
    component: () => import(/* webpackChunkName: "about" */ '../views/access-control/index.vue'),
    meta: {
      title: 'Control de accesos',
      roles: ['admin', 'guardia'],
      layout: 'Main',
      icon: 'el-icon-notebook-2',
      pageTitle: 'Control de accesos',
      breadcrumb: [
        { title: 'Inicio', url: '/' },
        { title: 'Edificios', url: '/edificios' },
        { title: 'Control de accesos', active: true },
      ],
    },
  },
  {
    path: '/inicio',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/access-request/index.vue'),
    meta: {
      title: 'Inicio',
      roles: ['estudiante', 'visitante', 'docente', 'personal'],
      layout: 'Main',
      icon: 'fa-home',
      pageTitle: 'Solicitudes de acceso',
      breadcrumb: [
        { title: 'Inicio', url: '/' },
        { title: 'Estado actual', active: true },
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
