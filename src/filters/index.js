import Vue from 'vue';
import moment from 'moment';

const dateFilter = (date) => moment(date).format('L');

Vue.filter('date', dateFilter);

const dateTimeFilter = (date) => moment(date).calendar();

Vue.filter('dateTime', dateTimeFilter);
