<template>
  <div
    id="w-core-layer-application"
    v-if="$store.state.SYSTEM.activeLayer == 'application'"
  >
    <KeepAlive>
      <Transition
        mode="out-in"
        name="module-transition"
      >
        <Component :is="activeModule"/>
      </Transition>
    </KeepAlive>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import AuthenticationModule from '@/components/core/module/authentication.vue';
import BaseModule from '@/components/core/module/base.vue';
import SettingsModule from '@/components/core/module/settings.vue';

export default {
  name: 'WCoreLayerApplication',
  components: {
    AuthenticationModule,
    BaseModule,
    SettingsModule
  },
  setup() {
    const $store = useStore();

    const activeModule = computed(function() {
      const map = {
        authentication: 'AuthenticationModule',
        base: 'BaseModule',
        settings: 'SettingsModule'
      };

      return map[$store.state.SYSTEM.APPLICATION.activeModule];
    });

    return {activeModule};
  }
}
</script>

<style lang="scss" scoped>
#w-core-layer-application {
  position: absolute;
  width: 100%;
  z-index: 1;
}
</style>