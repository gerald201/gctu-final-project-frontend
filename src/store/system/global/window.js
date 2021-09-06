const storeModule = {
  action: {},
  getters: {},
  modules: {},
  mutations: {
    SET_INNER_WIDTH(state, payload) {
      if(isNaN(payload)) return;

      payload = parseFloat(payload);

      if(payload < 0) return;

      state.innerWidth = payload;
    }
  },
  namespaced: true,
  state: {innerWidth}
};

export default storeModule;
