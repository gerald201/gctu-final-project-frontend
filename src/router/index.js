import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/config';
import store from '@/store';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({
          left: savedPosition?.left ?? 0,
          top: savedPosition?.top ?? 0
        });
      }, parseInt(store.state.PREFERENCES.SYSTEM.transitionDuration.replace('ms', '')) * 2);
    });
  }
});

export default router;
