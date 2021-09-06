<template>
  <div
    id="w-core-panel-base-content"
    :style="{
      '--w-appContent-content-size': `min(calc(100% - (${$store.getters['SYSTEM/GLOBAL/contentGutter']} * 2)), var(--w-system-responsive-break-point-lg))`,
      '--w-appContent-gutter-size': 'calc(0.5 * (100% - var(--w-appContent-content-size)))',
      '--navigation-offset': $store.getters['SYSTEM/APPLICATION/BASE/CONTENT/navigationOffset'],
      '--side-offset': $store.getters['SYSTEM/APPLICATION/BASE/CONTENT/sideOffset'],
    }"
  >
    <div class="body">
      <RouterView #default="{Component}">
        <KeepAlive>
            <Transition
              mode="out-in"
              name="router-view-transition"
            >
                <Component :is="Component"/>
            </Transition>
        </KeepAlive>
      </RouterView>
    </div>
  </div>
</template>

<script>
export default {name: 'WCorePanelBaseContent'}
</script>

<style lang="scss" scoped>
#w-core-panel-base-content {
  position: absolute;
  right: 0px;
  width: 100%;
  z-index: 1;

  & > .body {
    overflow-x: hidden;
    position: absolute;
    right: 0px;
    top: var(--navigation-offset);
    transition-property: top, width;
    width: calc(100% - var(--side-offset));
    z-index: 1;
  }
}
</style>