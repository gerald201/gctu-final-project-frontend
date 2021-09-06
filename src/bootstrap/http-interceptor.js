import axios from 'axios';
import backendConfig from '@/config/backend';

function main(store) {
  axios.defaults.baseURL = backendConfig.host;
  axios.interceptors.request.use(function(config) {
    if(store.getters['AUTHENTICATION/TOKEN/hasAccess']) config.headers.Authorization = `Bearer ${store.state.AUTHENTICATION.TOKEN.access.token}`;

    return config;
  }, function(error) {
    throw error;
  });
  axios.interceptors.response.use(function(response) {
    return response;
  }, async function(error) {
    const config = error.config;

    if(!config.refreshed__ && error.response?.data.title == 'Unauthenticated') {
      config.refreshed__ = true;
      await store.dispatch('AUTHENTICATION/refresh');
      return await axios(config);
    } else if(!error.response || error.response.status >= 500) {
      store.commit('SYSTEM/SET_ACTIVE_LAYER', 'error');
      store.commit('SYSTEM/SET_ERROR_MESSAGE', error.message);
    } else {
      store.commit('AUTHENTICATION/SET_USER', null);
      store.commit('AUTHENTICATION/TOKEN/SET_REFRESH', null);
      store.commit('AUTHENTICATION/TOKEN/SET_ACCESS', null);
    }

    throw error;
  });
}

export default main;
