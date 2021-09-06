<template>
  <div id="w-core-module-settings">
    <ContentPanel/>
    <NavigationPanel/>
  </div>
</template>

<script>
import { onActivated, onDeactivated, ref } from 'vue';
import ContentPanel from '@/components/core/panel/settings/content.vue';
import NavigationPanel from '@/components/core/panel/settings/navigation.vue';

export default {
  components: {
    ContentPanel,
    NavigationPanel
  },
  name: 'WCoreModuleSettings',
  setup() {
    const windowScrollY = ref(0);

    onActivated(function() {
      scrollTo({ 
        behavior: 'smooth',
        top: windowScrollY.value
      });
    });
    onDeactivated(function() {
      windowScrollY.value = scrollY;
    });

    return {windowScrollY};
  }
};
</script>

<style lang="scss" scoped>
  #w-core-module-settings {
    left: 0px;
    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 1;
  }
</style>