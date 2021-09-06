import color from '@/store/preferences/color';
import system from '@/store/preferences//system';

const storeModule = {
  actions: {},
  getters: {},
  modules: {
    COLOR: color,
    SYSTEM: system
  },
  mutations: {},
  namespaced: true,
  state: {}
};

export default storeModule;
