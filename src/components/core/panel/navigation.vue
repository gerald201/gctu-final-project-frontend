<template>
    <div
        id="gn-core-panel-navigation"
        :class="[
            {'state:disabled': $store.state.app.navigationPanelDisabled}
        ]"
    >
        <div class="body"></div>
    </div>
</template>

<script>
export default {
    name: 'GnCorePanelNavigation'
}
</script>

<style lang="scss" scoped>
#gn-core-panel-navigation {
    --self__pointer-events: auto;
    --body__height: 4rem;

    &:where(.state\:disabled) {
        --body__height: 0rem;
    }
}
#gn-core-panel-navigation {
    height: 100vh;
    left: 0px;
    pointer-events: none;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 3;

    & > * {
        pointer-events: var(--self__pointer-events);
    }

    & > .body {
        background-color: rgba(var(--gn-color-primary), 1);
        box-shadow: 0px 0px 0.1rem 0.25rem rgba(var(--gn-color-shadow), 0.25);
        height: var(--body__height);
        left: 0px;
        overflow: hidden;
        position: absolute;
        top: 0px;
        transition: height 120ms ease-out;
        width: 100%;
    }
}
</style>