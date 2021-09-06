import content from '@/store/system/application/base/content';
import navigation from '@/store/system/application/base/navigation';
import side from '@/store/system/application/base/side';

const storeModule = {
  actions: {},
  getters: {},
  modules: {
    CONTENT: content,
    NAVIGATION: navigation,
    SIDE: side
  },
  mutations: {},
  namespaced: true,
  state: {}
};

export default storeModule;
