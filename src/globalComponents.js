import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/es';
import locale from 'element-ui/lib/locale';
import FeatherIcon from './components/FeatherIcon.vue';

// configure language
locale.use(lang);

Vue.component(FeatherIcon.name, FeatherIcon);
Vue.use(ElementUI);
