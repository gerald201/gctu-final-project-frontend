import responsiveBreakPoints from '@/store/preferences/system/responsive-break-points';

const defaultState = {
  asideEmbedResponsiveBreakPoint: 'lg',
  asideHideResponsiveBreakPoint: 'sm',
  fontFamily: 'Montserrat',
  transitionDuration: '120ms',
  zoomFactor: 1
};
const storeModule = {
  actions: {},
  getters: {
    asCssValues(state) {
      const validKeys = [
        'fontFamily',
        'transitionDuration',
        'zoomFactor'
      ];
      const cssValues = {};

      for(const key of validKeys) {
        const khebabcaseKey = key.replace(/[A-Z]/g, function(match) {
          return `-${match.toLowerCase()}`
        });
        const cssKey = `--w-system-${khebabcaseKey}`;

        cssValues[cssKey] = state[key];
      }

      return cssValues;
    }
  },
  modules: {RESPONSIVE_BREAK_POINTS: responsiveBreakPoints},
  mutations: {},
  namespaced: true,
  state: defaultState
};

export default storeModule;
