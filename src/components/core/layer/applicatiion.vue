<template>
    <div id="gn-core-layer-application">
        <BaseModule></BaseModule>
    </div>
</template>

<script>
import BaseModule from '@/components/core/module/base';

export default {
    name: 'GnCoreLayerApplication',
    components: {BaseModule}
}
</script>

<style lang="scss" scoped>
#gn-core-layer-application {
    left: 0px;
    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 1;
}
</style>