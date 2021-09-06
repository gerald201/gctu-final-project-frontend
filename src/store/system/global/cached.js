import { decrypt } from '@/services/cypher';

const cachedEncryptedString = localStorage.getItem('store.system.general.storage.cached');
const cachedJSONString = cachedEncryptedString ? decrypt(cachedEncryptedString) : null;
const defaulState = cachedJSONString ? JSON.parse(cachedJSONString) : {};
const storeModule = {
  actions: {},
  getters: {},
  modules: {},
  mutations: {
    SET(state, payload) {
      if(!payload || typeof payload != 'object') return;

      for(const key in payload) {
        state[key] = payload[key];
      }
    }
  },
  namespaced: true,
  state: defaulState
};

export default storeModule;
