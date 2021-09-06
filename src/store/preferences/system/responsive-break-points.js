const defaultState = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};
const storeModule = {
  actions: {},
  getters: {
    asCssValues(state) {
      const cssValues = {};

      for(const key in state) {
        const khebabcaseKey = key.replace(/[A-Z]/g, function(match) {
          return `-${match.toLowerCase()}`
        });
        const cssKey = `--w-system-responsive-break-point-${khebabcaseKey}`;

        cssValues[cssKey] = state[key];
      }

      return cssValues;
    }
  },
  modules: {},
  mutations: {},
  namespaced: true,
  state: defaultState
};

export default storeModule;