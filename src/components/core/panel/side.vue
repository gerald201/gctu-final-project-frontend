<template>
  <div
    id="gn-core-panel-side"
    :class="[
        {
            'state:disabled': $store.state.app.sidePanelDisabled,
            'state:hovered': $store.state.app.sidePanelHovered
        }
    ]"
  >
      <div
        class="body"
        @mouseleave="$store.commit('app/SET_SIDE_PANEL_HOVERED', false);"
        @mouseover="$store.commit('app/SET_SIDE_PANEL_HOVERED', true);"
      ></div>
  </div>
</template>

<script>
export default {
    name: 'GnCorePanelSide'
}
</script>

<style lang="scss" scoped>
#gn-core-panel-side {
    --self__pointer-events: auto;
    --body__width: 4rem;

    &:where(.state\:hovered) {
        --body__width: 16rem;
    }
    &:where(.state\:disabled) {
        --body__width: 0px;
    }
}
#gn-core-panel-side {
    bottom: 0px;
    height: 100vh;
    left: 0px;
    pointer-events: none;;
    position: fixed;
    width: 100%;

    & > * {
        pointer-events: var(--self__pointer-events);
    }
    & > .body {
        background-color: rgba(var(--gn-color-side-panel-bg), 1);
        bottom: 0px;
        box-shadow: 0px 0px 0.1rem 0.25rem rgba(var(--gn-color-shadow), 0.25);
        height: calc(100% - 4rem);
        left: 0px;
        overflow: hidden;
        position: absolute;
        transition: width 120ms ease-out;
        width: var(--body__width);
    }
}
</style>