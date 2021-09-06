import { decrypt } from '@/services/cypher';
import base from '@/store/system/application/base';

const cachedEncryptedString = localStorage.getItem('store.system.general.storage.cached');
const cachedJSONString = cachedEncryptedString ? decrypt(cachedEncryptedString) : null;
const cached = cachedJSONString ? JSON.parse(cachedJSONString) : {};
const defaultState = {
  activeModule: cached['store.system.application.activeModule'] ? JSON.parse(decrypt(cached['store.system.application.activeModule'])) : 'base',
  previousModule: cached['store.system.application.previousModule'] ? JSON.parse(decrypt(cached['store.system.application.previousModule'])) : 'base'
};
const storeModule = {
  actions: {},
  getters: {},
  modules: {BASE: base},
  mutations: {
    SET_ACTIVE_MODULE(state, payload) {
      const valid = [
        'authentication',
        'base',
        'settings'
      ];

      if(!valid.includes(payload)) return;

      if(state.activeModule == payload) return;

      state.previousModule = state.activeModule;
      state.activeModule = payload;
    }
  },
  namespaced: true,
  state: defaultState
};

export default storeModule;
