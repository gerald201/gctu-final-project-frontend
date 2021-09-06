const storeModule = {
  actions: {},
  getters: {
    autoEmbed(state, getters, rootState, rootGetters) {
      const breakPointIndex = rootGetters['SYSTEM/GLOBAL/activeResponsiveBreakPoints']
        .findIndex(function(point) {
          return point == rootState.PREFERENCES.SYSTEM.asideEmbedResponsiveBreakPoint;
        });

      return breakPointIndex >= 0;
    },
    autoHide(state, getters, rootState, rootGetters) {
      const breakPointIndex = rootGetters['SYSTEM/GLOBAL/activeResponsiveBreakPoints']
        .findIndex(function(point) {
          return point == rootState.PREFERENCES.SYSTEM.asideHideResponsiveBreakPoint;
        });

      return breakPointIndex <= 0;
    },
    currentWidth(state, getters) {
      if(state.disabled) return '0px';

      if(state.expanded) return '16rem';

      if(getters.autoHide) return '0px';

      if(state.hovered) return '16rem';

      return '4rem';
    }
  },
  modules: {},
  mutations: {
    SET_DISABLED(state, payload) {
      state.disabled = !!payload;
    },
    SET_EXPANDED(state, payload) {
      state.expanded = !!payload;
    },
    SET_HOVERED(state, payload) {
      state.hovered = !!payload;
    }
  },
  namespaced: true,
  state: {
    disabled: false,
    expanded: false,
    hovered: false
  }
};

export default storeModule;
