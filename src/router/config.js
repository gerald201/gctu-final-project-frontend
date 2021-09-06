import HomeView from '@/views/home';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      checks: {
        applicationBaseNavigationPanelAppLinkEnabled: true,
        applicationBaseSidePanelDisabled: true
      }
    }
  },
  {
    path: '/app',
    name: 'App',
    component() {
      return import('@/views/app');
    },
    meta: {
      guards: {requireAuth: true}
    }
  }
];

export default routes;
