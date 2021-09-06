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
  state: {}
};

export default storeModule;
