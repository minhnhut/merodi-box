import Vue from 'vue'
import App from './screen/App.vue'
import Play from './screen/Play.vue'

import VueRouter from 'vue-router'

// require('vuetify/dist/vuetify.min.css');

Vue.use(VueRouter);


const routes = [
    { path: '/', component: Play },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes // short for `routes: routes`
});


new Vue({
    render: h => h(App),
    router
}).$mount('#root');