import { encrypt } from '@/services/cypher';
import socket from '@/services/socket';

function main(store) {
  store.watch(function(state) {
    return state.AUTHENTICATION.TOKEN;
  }, async function(value) {
    store.commit('SYSTEM/GLOBAL/CACHED/SET', {'store.authentication.token': encrypt(JSON.stringify(value))});

    try {
      if(value.refresh) await store.dispatch('AUTHENTICATION/me');
    } catch(error) {
      store.commit('AUTHENTICATION/SET_USER', null);
      store.commit('AUTHENTICATION/TOKEN/SET_REFRESH', null);
      store.commit('AUTHENTICATION/TOKEN/SET_ACCESS', null);
    }

    if(store.getters['AUTHENTICATION/isAuthenticated']) {
      socket.emit('authentication-token:set', {
        userId: store.state.AUTHENTICATION.user.id,
        token: value
      });
    }
  }, {deep: true});

  store.watch(function(state, getters) {
    return getters['AUTHENTICATION/isAuthenticated'];
  }, function(value) {
    if(value && store.state.SYSTEM.APPLICATION.activeModule == 'authentication') store.commit('SYSTEM/APPLICATION/SET_ACTIVE_MODULE', store.state.SYSTEM.APPLICATION.previousModule == 'authentication' ? 'base' : store.state.SYSTEM.APPLICATION.previousModule);
    else if(!value && store.state.SYSTEM.APPLICATION.activeModule == 'settings') store.commit('SYSTEM/APPLICATION/SET_ACTIVE_MODULE', store.state.SYSTEM.APPLICATION.previousModule == 'settings' ? 'base' : store.state.SYSTEM.APPLICATION.previousModule);
  });

  store.watch(function(state) {
    return state.SYSTEM.APPLICATION.activeModule;
  }, function(value, oldValue) {
    store.commit('SYSTEM/GLOBAL/CACHED/SET', {'store.system.application.activeModule': encrypt(JSON.stringify(value))});
    store.commit('SYSTEM/GLOBAL/CACHED/SET', {'store.system.application.previousModule': encrypt(JSON.stringify(oldValue))});

    if(store.getters['AUTHENTICATION/isAuthenticated'] && value == 'authentication') store.commit('SYSTEM/APPLICATION/SET_ACTIVE_MODULE', oldValue == 'authentication' ? 'base' : oldValue);
    else if(!store.getters['AUTHENTICATION/isAuthenticated'] && value == 'settings') store.commit('SYSTEM/APPLICATION/SET_ACTIVE_MODULE', oldValue == 'settings' ? 'base' : oldValue);
  });

  store.watch(function(state) {
    return state.SYSTEM.APPLICATION.BASE.SIDE.disabled;
  }, function(value) {
    if(value) {
      store.commit('SYSTEM/APPLICATION/BASE/SIDE/SET_EXPANDED', false);
      store.commit('SYSTEM/APPLICATION/BASE/SIDE/SET_HOVERED', false);
    } else if(store.getters['SYSTEM/APPLICATION/BASE/SIDE/autoEmbed']) store.commit('SYSTEM/APPLICATION/BASE/SIDE/SET_EXPANDED', true);
  });

  store.watch(function(state, getters) {
    return getters['SYSTEM/APPLICATION/BASE/SIDE/autoEmbed'];
  }, function(value) {
    if(!store.state.SYSTEM.APPLICATION.BASE.SIDE.disabled) store.commit('SYSTEM/APPLICATION/BASE/SIDE/SET_EXPANDED', value);
  });

  store.watch(function(state) {
    return state.SYSTEM.GLOBAL.CACHED;
  }, async function(value) {
    localStorage.setItem('store.system.general.storage.cached', encrypt(JSON.stringify(value)));
    socket.emit('cache-data:restore');
  }, {deep: true});

  store.watch(function(state, getters) {
    return getters['PREFERENCES/COLOR/actualActiveModeValuesAsCss'];
  }, function(value) {
    for(const key in value) {
      document.documentElement.style.setProperty(key, value[key]);
    }
  }, {deep: true});

  store.watch(function(state, getters) {
    return getters['PREFERENCES/SYSTEM/asCssValues'];
  }, function(value) {
    for(const key in value) {
      document.documentElement.style.setProperty(key, value[key]);
    }
  }, {deep: true});

  store.watch(function(state, getters) {
    return getters['PREFERENCES/SYSTEM/RESPONSIVE_BREAK_POINTS/asCssValues'];
  }, function(value) {
    for(const key in value) {
      document.documentElement.style.setProperty(key, `${value[key]}px`);
    }
  }, {deep: true});
}

export default main;
