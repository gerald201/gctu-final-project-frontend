import application from '@/store/system/application';
import global from '@/store/system/global';

const storeModule = {
  actions: {},
  getters: {},
  modules: {
    APPLICATION: application,
    GLOBAL: global
  },
  mutations: {
    SET_ACTIVE_LAYER(state, payload) {
      const valid = [
        'application',
        'error',
        'loader'
      ];

      if(!valid.includes(payload)) return;

      if(payload == state.activeLayer) return;

      state.previousLayer = state.activeLayer;
      state.activeLayer = payload;
    },
    SET_ERROR_MESSAGE(state, payload) {
      state.errorMessage = payload?.toString?.() || '';
    },
    SET_LOADER_MESSAGE(state, payload) {
      state.loaderMessage = payload?.toString?.() || '';
    }
  },
  namespaced: true,
  state: {
    activeLayer: 'loader',
    errorMessage: '',
    loaderMessage: '',
    previousLayer: 'loader'
  }
};

export default storeModule;
