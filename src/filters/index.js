import Vue from 'vue';
import moment from 'moment';

const dateFilter = (date) => moment(date).format('MMMM Do YYYY, h:mm:ss a');

Vue.filter('date', dateFilter);
