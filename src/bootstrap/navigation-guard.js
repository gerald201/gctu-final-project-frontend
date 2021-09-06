import routeConfig from '@/config/route';

const guardKeys = [
  'requireAuth',
  'requireGuest'
];

function checkGuard(route, guardName, store) {
  const guards = guardKeys
    .reduce(function(result, guardKey) {
      result[guardKey] = route.matched
        .some(function(m) {
          return m.meta.guards?.[guardKey] === true
        });
      return result;
    }, {});
  
  switch(guardName) {
    case 'requireAuth': return guards[guardName] ? store.getters['AUTHENTICATION/isAuthenticated'] : true;
    case 'requireGuest': return guards[guardName] ? !store.getters['AUTHENTICATION/isAuthenticated'] : true;
    default: return true;
  }
}

function main(router, store) {
  router.beforeEach(function(to, from, next) {
    const fromGuardCheck = guardKeys
      .every(function(guardKey) {
        return checkGuard(from, guardKey, store);
      });
    const toGuardCheck = guardKeys
      .every(function(guardKey) {
        return checkGuard(to, guardKey, store);
      });

    if(store.state.SYSTEM.GLOBAL.STATES.initialized) store.commit('SYSTEM/APPLICATION/SET_ACTIVE_MODULE', 'base');

    if(!to.matched.length) {
      if(!from.matched.length) return next(routeConfig.homeRoute);

      if(!fromGuardCheck) return next(routeConfig.homeRoute);

      return next(false);
    }

    if(!store.state.SYSTEM.GLOBAL.STATES.initialized) return next();

    if(!toGuardCheck) {
      if(!from.matched.length) return next(routeConfig.homeRoute);

      if(!fromGuardCheck) return next(routeConfig.homeRoute);

      return next(false);
    }

    return next();
  });
}

export default main;
