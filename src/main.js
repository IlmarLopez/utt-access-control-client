import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './globalComponents';

// import filters
import './filters/index';

// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from './httpConfig/http';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
