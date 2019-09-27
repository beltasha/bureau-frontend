import Vue from 'vue';
import Router from 'vue-router';

import Feed from './components/Feed.vue';
import Settings from './components/Settings.vue';

Vue.use(Router);

const routes = [
  { path: '/', name: 'home', redirect: { name: 'feed' } },
  { path: '/feed', name: 'feed', component: Feed },
  { path: '/settings', name: 'settings', component: Settings }
];

const router = new Router({
  routes,
  mode: 'history'
});

export default router;