const storeModule = {
  actions: {},
  getters: {},
  modules: {},
  mutations: {
    SET_INITIALIZED(state, payload) {
      return state.initialized = !!payload;
    }
  },
  namespaced: true,
  state: {initialized: false}
};

export default storeModule;
