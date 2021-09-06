const storeModule = {
  actions: {},
  getters: {
    navigationOffset(state, getters, rootState) {
      if(rootState.SYSTEM.APPLICATION.BASE.NAVIGATION.disabled) return '0px';

      return '4rem';
    },
    sideOffset(state, getters, rootState, rootGetters) {
      if(rootState.SYSTEM.APPLICATION.BASE.SIDE.disabled) return '0px';

      if(rootGetters['SYSTEM/APPLICATION/BASE/SIDE/autoHide']) return '0px';

      if(rootGetters['SYSTEM/APPLICATION/BASE/SIDE/autoEmbed'] && rootState.SYSTEM.APPLICATION.BASE.SIDE.expanded) return '16rem';

      return '4rem';
    }
  },
  modules: {},
  mutations: {},
  namespaced: true,
  state: {}
};

export default storeModule;
