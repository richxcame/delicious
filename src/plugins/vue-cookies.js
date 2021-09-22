import Vue from 'vue';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);

Vue.$cookies.config(process.env.VUE_APP_COOKIE_TIME);

export default VueCookies;
