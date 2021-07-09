<template>
    <div id="gn-core-module-base">
        <ContentPanel></ContentPanel>
        <SidePanel></SidePanel>
        <NavigationPanel></NavigationPanel>
    </div>
</template>

<script>
import ContentPanel from '@/components/core/panel/content';
import NavigationPanel from '@/components/core/panel/navigation';
import SidePanel from '@/components/core/panel/side';

export default {
    name: 'GnCoreModuleBase',
    components: {
        ContentPanel,
        NavigationPanel,
        SidePanel
    }
}
</script>

<style lang="scss" scoped>
#gn-core-module-base {
    left: 0px;
    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 1;
}
</style>