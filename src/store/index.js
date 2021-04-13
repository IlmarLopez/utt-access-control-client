import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
// Load store modules dynamically.
const requireContext = require.context('./module', false, /.*\.js$/);

const modules = requireContext
  .keys()
  .map((file) => [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)])
  .reduce((_modules, [name, module]) => {
    if (module.namespaced === undefined) {
      // eslint-disable-next-line no-param-reassign
      module.namespaced = true;
    }

    return { ..._modules, [name]: module.default };
  }, {});

export default new Vuex.Store({
  modules,
  strict: debug,
});
