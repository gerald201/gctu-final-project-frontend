<template>
    <ApplicationLayer></ApplicationLayer>
</template>

<script>
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ApplicationLayer from '@/components/core/layer/applicatiion';

export default {
    name: 'GnApp',
    components: {ApplicationLayer},
    setup() {
        const $route = useRoute();
        const $store = useStore();

        watchEffect(function() {
            const disableNavigationPanel = $route.matched
                .some(function(match) {
                    return match.meta?.disableNavigationPanel === true;
                });
            const disableSidePanel = $route.matched
                .some(function(match) {
                    return match.meta?.disableSidePanel === true;
                });

            $store.commit('app/SET_NAVIGATION_PANEL_DISABLED', disableNavigationPanel);
            $store.commit('app/SET_SIDE_PANEL_DISABLED', disableSidePanel);
        })
    }
}
</script>

<style lang="scss">
@import "~@/assets/fonts/Nunito/style.css";

* {
    box-sizing: border-box;
    font-family: Nunito, 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
html {
    --gn-color-bg: 242, 238, 238;
    --gn-color-primary: 41, 42, 102;
    --gn-color-primary-light: 52, 143, 226;
    --gn-color-secondary: 0, 127, 255;
    --gn-color-shadow: 141, 153, 174;
    --gn-color-side-panel-bg: 255, 255, 255;
}
html {
    font-size: 14px;
}
body {
    background-color: rgba(var(--gn-color-bg), 1);
    margin: 0px;
    padding: 0px;
}
#app {
    width: 100%;
}
</style>
