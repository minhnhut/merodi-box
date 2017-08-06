import Vue from 'vue'
import App from './core/App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

require('vuetify/dist/vuetify.min.css');

Vue.use(VueRouter);
Vue.use(Vuetify);

const routes = [
    { path: '/', component: App },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes // short for `routes: routes`
});


new Vue({
  router
}).$mount('#root');