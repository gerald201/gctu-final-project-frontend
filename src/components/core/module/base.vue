<template>
  <div id="w-core-module-base">
    <ContentPanel/>
    <Transition name="panel-transition">
      <NavigationPanel v-if="!$store.state.SYSTEM.APPLICATION.BASE.NAVIGATION.disabled"/>
    </Transition>
    <Transition name="panel-transition">
      <SidePanel v-if="!$store.state.SYSTEM.APPLICATION.BASE.SIDE.disabled"/>
    </Transition>
  </div>
</template>

<script>
import { onActivated, onDeactivated, ref } from 'vue';
import ContentPanel from '@/components/core/panel/base/content.vue';
import NavigationPanel from '@/components/core/panel/base/navigation.vue';
import SidePanel from '@/components/core/panel/base/side.vue';

export default {
  components: {
    ContentPanel,
    NavigationPanel,
    SidePanel
  },
  name: 'WCoreModuleBase',
  setup() {
    const windowScrollY = ref(0);

    onActivated(function() {
      scrollTo({ 
        behavior: 'smooth',
        top: windowScrollY.value});
    });
    onDeactivated(function() {
      windowScrollY.value = scrollY;
    });

    return {windowScrollY};
  }
};
</script>

<style lang="scss" scoped>
  #w-core-module-base {
    left: 0px;
    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 1;
  }
</style>