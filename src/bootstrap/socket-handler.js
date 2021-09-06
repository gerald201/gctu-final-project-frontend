import { decrypt } from '@/services/cypher';
import socket from '@/services/socket';

function main(store) {
  socket.on('authentication-token:set', function(data) {
    if(!store.getters['AUTHENTICATION/hasUser']) return;

    if(data.userId != store.state.AUTHENTICATION.user.id) return;

    store.commit('AUTHENTICATION/TOKEN/SET_ACCESS', data.token?.access);
    store.commit('AUTHENTICATION/TOKEN/SET_REFRESH', data.token?.refresh);
  });

  socket.on('cache-data:restore', function() {
    const cachedEncryptedString = localStorage.getItem('store.system.general.storage.cached');
    const cachedJSONString = cachedEncryptedString ? decrypt(cachedEncryptedString) : null;
    const cached = cachedJSONString ? JSON.parse(cachedJSONString) : {};
    const token = cached?.['store.authentication.token'] ? JSON.parse(decrypt(cached['store.authentication.token'])) : null;

    store.commit('SYSTEM/GLOBAL/CACHED/SET', cached);
    store.commit('AUTHENTICATION/TOKEN/SET_ACCESS', token?.access);
    store.commit('AUTHENTICATION/TOKEN/SET_REFRESH', token?.refresh);
  });
}

export default main;
