import NProgress from 'nprogress'; // progress bar
import { Message } from 'element-ui';
import getPageTitle from '@/plugins/get-page-title';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // no redirect whitelist

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

function executeMiddleware(to, from, next) {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
      store,
    };

    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  }
  return null;
}

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  if (store.getters['auth/isAutenticated']) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ name: '/' });
      NProgress.done();
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters['auth/roles'] && store.getters['auth/roles'].length > 0;
      if (hasRoles) {
        // eslint-disable-next-line no-unused-expressions
        executeMiddleware(to, from, next) || next();
      } else {
        try {
          // get user info
          const { data } = await store.dispatch('auth/USER_REQUEST');
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const roles = [];
          roles.push(data.role_name);
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/GENERATE_ROUTES', roles);
          // dynamically add accessible routes
          router.addRoutes(accessRoutes);

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          // eslint-disable-next-line no-unused-expressions
          executeMiddleware(to, from, next) || next({ ...to, replace: true });
        } catch (error) {
          console.log(error);
          // remove token and go to login page to re-login
          await store.dispatch('auth/DESTROY_SESSION');
          await store.commit('permission/REMOVE_ROUTES');
          Message.error(error || 'Has Error');
          next('/login');
          NProgress.done();
        }
      }
    }
  } else {
    await store.commit('permission/REMOVE_ROUTES');
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
