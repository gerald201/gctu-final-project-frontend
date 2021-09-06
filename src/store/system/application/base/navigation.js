const storeModule = {
  actions: {},
  getters: {
    currentOffset(state, getters, rootState, rootGetters) {
      if(rootState.SYSTEM.APPLICATION.BASE.SIDE.disabled) return '0px';

      if(rootGetters['SYSTEM/APPLICATION/BASE/SIDE/autoHide']) return '0px';

      if(rootGetters['SYSTEM/APPLICATION/BASE/SIDE/autoEmbed'] && rootState.SYSTEM.APPLICATION.BASE.SIDE.expanded) return '16rem';

      return '4rem';
    }
  },
  modules: {},
  mutations: {
    SET_DISABLED(state, payload) {
      state.disabled = !!payload;
    },
    SET_FORCE_LOGO(state, payload) {
      state.forceLogo = !!payload;
    },
    SET_STATIC_LOGO_DISABLED(state, payload) {
      state.staticLogoDisabled = !!payload;
    }
  },
  namespaced: true,
  state: {
    disabled: false,
    forceLogo: false
  }
};

export default storeModule;
