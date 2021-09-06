import { createStore } from 'vuex';
import authentication from '@/store/authentication';
import preferences from '@/store/preferences';
import system from '@/store/system';

const store = createStore({
  actions: {},
  getters: {},
  modules: {
    AUTHENTICATION: authentication,
    PREFERENCES: preferences,
    SYSTEM: system
  },
  mutations: {},
  state: {},
  strict: true
});

for(const key in store.getters['PREFERENCES/COLOR/actualActiveModeValuesAsCss']) {
  document.documentElement.style.setProperty(key, store.getters['PREFERENCES/COLOR/actualActiveModeValuesAsCss'][key]);
}

for(const key in store.getters['PREFERENCES/SYSTEM/asCssValues']) {
  document.documentElement.style.setProperty(key, store.getters['PREFERENCES/SYSTEM/asCssValues'][key]);
}

for(const key in store.getters['PREFERENCES/SYSTEM/RESPONSIVE_BREAK_POINTS/asCssValues']) {
  document.documentElement.style.setProperty(key, `${store.getters['PREFERENCES/SYSTEM/RESPONSIVE_BREAK_POINTS/asCssValues'][key]}px`);
}

export default store;
