import { decrypt } from '@/services/cypher';

const cachedEncryptedString = localStorage.getItem('store.system.general.storage.cached');
const cachedJSONString = cachedEncryptedString ? decrypt(cachedEncryptedString) : null;
const cached = cachedJSONString ? JSON.parse(cachedJSONString) : {};
const defaultState = cached['store.authentication.token'] ? JSON.parse(decrypt(cached['store.authentication.token'])) : {
  access: null,
  refresh: null
};
const storeModule = {
  actions: {},
  getters: {
    hasAccess(state) {
      return !!state.access;
    },
    hasRefresh(state) {
      return !!state.refresh;
    }
  },
  modules: {},
  mutations: {
    SET_ACCESS(state, payload) {
      const valid = [
        'expiresIn',
        'token'
      ]
        .every(function(key) {
          return payload?.hasOwnProperty(key);
        });

      if(!payload) {
        state.access = null;
        return;
      }

      if(!valid) return;

      state.access = payload;
    },
    SET_REFRESH(state, payload) {
      const valid = [
        'expiresIn',
        'token'
      ]
        .every(function(key) {
          return payload?.hasOwnProperty(key);
        });

      if(!payload) {
        state.refresh = null;
        return;
      }

      if(!valid) return;

      state.refresh = payload;
    }
  },
  namespaced: true,
  state: defaultState
};

export default storeModule;
