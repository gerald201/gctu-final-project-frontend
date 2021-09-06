import axios from 'axios';
import token from '@/store/authentication/token';

const storeModule = {
  actions: {
    async me(context) {
      try {
        const response = await axios.get('/api/authentication/me');

        context.commit('SET_USER', response.data.user);
        return response;
      } catch(error) {
        throw error;
      }
    },
    async ping() {
      try {
        const response = await axios.get('/api/authentication/ping');

        return response;
      } catch(error) {
        throw error;
      }
    },
    async refresh(context) {
      try {
        const response = await axios.get('/api/authentication/refresh', {
          params: {token: context.rootState.AUTHENTICATION.TOKEN.refresh?.token || ''}
        });

        context.commit('AUTHENTICATION/TOKEN/SET_ACCESS', response.data.accessToken, {root: true});
        return response;
      } catch(error) {
        throw error;
      }
    },
    async signIn(context, payload) {
      try {
        const response = await axios.post('/api/authentication/sign-in', payload);

        context.commit('SET_USER', response.data.user);
        context.commit('AUTHENTICATION/TOKEN/SET_REFRESH', response.data.token.refresh, {root: true});
        context.commit('AUTHENTICATION/TOKEN/SET_ACCESS', response.data.token.access, {root: true});
        return response;
      } catch(error) {
        throw error;
      }
    },
    async signOut(context) {
      try {
        const response = await axios.get('/api/authentication/sign-out');

        context.commit('SET_USER', null);
        context.commit('AUTHENTICATION/TOKEN/SET_REFRESH', null, {root: true});
        context.commit('AUTHENTICATION/TOKEN/SET_ACCESS', null, {root: true});
        return response;
      } catch(error) {
        throw error;
      }
    },
    async signUp(context, payload) {
      try {
        const response = await axios.post('/api/authentication/sign-up', payload);

        context.commit('SET_USER', response.data.user);
        context.commit('AUTHENTICATION/TOKEN/SET_REFRESH', response.data.token.refresh, {root: true});
        context.commit('AUTHENTICATION/TOKEN/SET_ACCESS', response.data.token.access, {root: true});
        return response;
      } catch(error) {
        throw error;
      }
    }
  },
  getters: {
    hasUser(state) {
      return !!state.user;
    },
    isAuthenticated(state, getters, rootState, rootGetters) {
      return getters.hasUser && rootGetters['AUTHENTICATION/TOKEN/hasAccess'];
    },
    userEmailIsVerified(state) {
      if(!state.user?.email) return false;

      return !!state.user.emailVerifiedAt;
    },
    userPhoneIsVerified(state) {
      if(!state.user?.phone) return false;

      return !!state.user.phoneVerifiedAt;
    }
  },
  modules: {TOKEN: token},
  mutations: {
    SET_USER(state, payload) {
      const valid = [
        '_roles',
        'createdAt',
        'deletedAt',
        'id',
        'index',
        'updatedAt'
      ]
        .every(function(key) {
          return payload?.hasOwnProperty(key);
        });

      if(!payload) {
        state.user = null;
        return;
      }

      if(!valid) return;

      state.user = payload;
    }
  },
  namespaced: true,
  state: {user: null}
};

export default storeModule;
