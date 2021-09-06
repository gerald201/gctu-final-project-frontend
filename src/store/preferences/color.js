const defaultState = {
  activeMapping: 'default',
  activeMode: 'system',
  mappings: [
    {
      name: 'default',
      modes: {
        dark: {
          asideBackground: '26,26,28',
          background: '45,45,49',
          black: '26,26,28',
          blue: '49,133,252',
          cyan: '91,192,235',
          danger: '255,27,28',
          dark: '45,45,49',
          darker: '36,36,38',
          foreground: '36,36,38',
          grayLevel1: '161,161,179',
          grayLevel2: '144,144,163',
          grayLevel3: '127,127,145',
          grayLevel4: '108,108,126',
          grayLevel5: '84,84,100',
          green: '9,232,94',
          info: '49,133,252',
          light: '223,223,237',
          lighter: '235,235,243',
          magenta: '255,0,127',
          mute: '144,144,163',
          navBackground: '26,26,28',
          orange: '255,127,17',
          overlay: '26,26,28',
          primary: '41,169,255',
          purple: '154,72,208',
          red: '255,27,28',
          secondary: '255,28,89',
          shadow: '223,223,237',
          success: '9,232,94',
          tertiary: '42,248,142',
          text: '248,248,255',
          turqoise: '0,217,192',
          warning: '253,231,76',
          white: '248,248,255',
          yellow: '253,231,76'
        },
        light: {
          asideBackground: '248,248,255',
          background: '223,223,237',
          black: '26,26,28',
          blue: '49,133,252',
          cyan: '91,192,235',
          danger: '255,27,28',
          dark: '45,45,49',
          darker: '36,36,38',
          foreground: '235,235,243',
          grayLevel1: '161,161,179',
          grayLevel2: '144,144,163',
          grayLevel3: '127,127,145',
          grayLevel4: '108,108,126',
          grayLevel5: '84,84,100',
          green: '9,232,94',
          info: '49,133,252',
          light: '223,223,237',
          lighter: '235,235,243',
          magenta: '255,0,127',
          mute: '108,108,126',
          navBackground: '248,248,255',
          orange: '255,127,17',
          overlay: '248,248,255',
          primary: '41,169,255',
          purple: '154,72,208',
          red: '255,27,28',
          secondary: '255,28,89',
          shadow: '45,45,49',
          success: '9,232,94',
          tertiary: '42,248,142',
          text: '26,26,28',
          turqoise: '0,217,192',
          warning: '253,231,76',
          white: '248,248,255',
          yellow: '253,231,76'
        }
      }
    }
  ]
};
const storeModule = {
  actions: {},
  getters: {
    actualActiveMode(state, getters, rootState) {
      if(state.activeMode != 'system') return state.activeMode;

      return rootState.SYSTEM.GLOBAL.MATCH_MEDIA.darkMode ? 'dark' : 'light';
    },
    actualActiveModeValues(state, getters) {
      const mapping = state.mappings
        .find(function(mapping) {
          return mapping.name == state.activeMapping;
        });

      return mapping.modes[getters.actualActiveMode];
    },
    actualActiveModeValuesAsCss(state, getters) {
      const cssValues = {};

      for(const key in getters.actualActiveModeValues) {
        const khebabcaseKey = key.replace(/[A-Z]/g, function(match) {
          return `-${match.toLowerCase()}`;
        })
        const cssKey = `--w-color-${khebabcaseKey}`;

        cssValues[cssKey] = getters.actualActiveModeValues[key];
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
