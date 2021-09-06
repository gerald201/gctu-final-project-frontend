const storeModule = {
  actions: {},
  getters: {},
  modules: {},
  mutations: {
    SET_DARK_MODE(state, payload) {
      state.darkMode = !!payload;
    }, 
    SET_DEVICE_HOVER(state, payload) {
      state.deviceHover = !!payload;
    },
    SET_DEVICE_POINTER(state, payload) {
      state.devicePointer = !!payload;
    }
  },
  namespaced: true,
  state: {
    darkMode: matchMedia('(prefers-color-scheme: dark)').matches,
    deviceHover: matchMedia('(hover: hover)').matches,
    devicePointer: matchMedia('(pointer: fine)').matches
  }
};

export default storeModule;
