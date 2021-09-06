import domObserver from '@/bootstrap/dom-observer';
import httpInterceptor from '@/bootstrap/http-interceptor';
import navigationGuard from '@/bootstrap/navigation-guard';
import SocketHandler from '@/bootstrap/socket-handler';
import vuexObserver from '@/bootstrap/vuex-observer';
import polyfill from '@/polyfill';

async function main(router, store) {
  polyfill();

  domObserver(store);
  httpInterceptor(store);
  navigationGuard(router, store);
  SocketHandler(store);
  vuexObserver(store);

  store.commit('SYSTEM/SET_LOADER_MESSAGE', 'Readying Up...');

  try {
    await store.dispatch('AUTHENTICATION/me');
  } catch(error) {
    store.commit('AUTHENTICATION/TOKEN/SET_ACCESS', null);
    store.commit('AUTHENTICATION/TOKEN/SET_REFRESH', null);
    store.commit('AUTHENTICATION/SET_USER', null);
  }

  store.commit('SYSTEM/SET_LOADER_MESSAGE', 'Finalizing...');
  store.commit('SYSTEM/GLOBAL/STATES/SET_INITIALIZED', true);
  store.commit('SYSTEM/SET_ACTIVE_LAYER', store.state.SYSTEM.activeLayer == 'error' ? 'error' : 'application');

  if(store.state.SYSTEM.activeLayer == 'application') {
    const applicationActiveModule = store.state.SYSTEM.APPLICATION.activeModule;
    const currentRoute = router.currentRoute.value;

    await router.push('/_'); 
    await router.push(currentRoute);
    store.commit('SYSTEM/APPLICATION/SET_ACTIVE_MODULE', applicationActiveModule);
  }    
} 

export default main;
