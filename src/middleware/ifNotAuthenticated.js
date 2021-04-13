export default function guest({ next, store }) {
  if (store.getters['auth/isAutenticated']) {
    // change redict to '/home'
    return next('/');
  }
  return next();
}
