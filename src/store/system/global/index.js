import cached from '@/store/system/global/cached';
import directives from '@/store/system/global/directives';
import matchMedia from '@/store/system/global/match-media';
import states from '@/store/system/global/states';
import window from '@/store/system/global/window';

const storeModule = {
  actions: {},
  getters: {
    activeResponsiveBreakPoints(state, getters, rootState) {
      const activePointEntries = Object.entries(rootState.PREFERENCES.SYSTEM.RESPONSIVE_BREAK_POINTS)
        .filter(function([key, value]) {
          return value <= rootState.SYSTEM.GLOBAL.WINDOW.innerWidth;
        })
        .sort(function([keyA, valueA], [keyB, valueB]) {
          return valueB - valueA;
        });

      return activePointEntries
        .map(function([key]) {
          return key;
        });
    },
    contentGutter(state, getters) {
      const valueMap = {
        xs: '0.75rem',
        sm: '1rem',
        md: '1.25rem',
        lg: '1.5rem',
        xl: '1.75rem',
        xxl: '2rem'
      }; 

      return valueMap[getters.activeResponsiveBreakPoints[0]];
    }
  },
  modules: {
    CACHED: cached,
    DIRECTIVES: directives,
    MATCH_MEDIA: matchMedia,
    STATES: states,
    WINDOW: window
  },
  mutations: {},
  namespaced: true,
  state: {}
};

export default storeModule;