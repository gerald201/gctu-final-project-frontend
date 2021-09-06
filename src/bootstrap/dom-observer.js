function main(store) {
  matchMedia('(hover: hover)').addEventListener('change', function(event) {
    store.commit('SYSTEM/GLOBAL/MATCH_MEDIA/SET_DEVICE_HOVER', event.matches);
  });
  matchMedia('(pointer: fine)').addEventListener('change', function(event) {
    store.commit('SYSTEM/GLOBAL/MATCH_MEDIA/SET_DEVICE_POINTER', event.matches);
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(event) {
    store.commit('SYSTEM/GLOBAL/MATCH_MEDIA/SET_DARK_MODE', event.matches);
  });
}

export default main;
