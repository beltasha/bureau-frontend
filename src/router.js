import Vue from 'vue';
import Router from 'vue-router';

import Feed from './components/Feed.vue';
import Settings from './components/Settings.vue';
import Login from './components/Login.vue';

Vue.use(Router);

const routes = [
  { path: '/', name: 'home', redirect: { name: 'feed' } },
  { path: '/feed', name: 'feed', component: Feed },
  { path: '/settings', name: 'settings', component: Settings },
  { path: '/login', name: 'login', component: Login }
];

const router = new Router({
  routes,
  mode: 'history'
});

export default router;