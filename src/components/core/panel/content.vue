<template>
    <div
        id="gn-core-panel-content"
        :class="[
            {
                'state:navigation-panel-disabled': $store.state.app.navigationPanelDisabled,
                'state:side-panel-disabled': $store.state.app.sidePanelDisabled,
            }
        ]"
    >
        <div class="body">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GnCorePanelContent'
}
</script>

<style lang="scss" scoped>
#gn-core-panel-content {
    --self__pointer-events: auto;
    --body__left: 4rem;
    --body__top: 4rem;

    &:where(.state\:navigation-panel-disabled) {
        --body__top: 0px;
    }
    &:where(.state\:side-panel-disabled) {
        --body__left: 0px;
    }
}
#gn-core-panel-content {
    left: 0px;
    pointer-events: none;
    position: absolute;
    top: 0px;
    width: 100%;

    & > * {
        pointer-events: var(--self__pointer-events);
    }

    & > .body {
        left: var(--body__left);
        min-height: calc(100vh - var(--body__top));
        position: absolute;
        top: var(--body__top);
        transition-duration: 120ms;
        transition-property: height, left, top, width;
        transition-timing-function: ease-out;
        width: calc(100% - var(--body__left));
    }
}
</style>