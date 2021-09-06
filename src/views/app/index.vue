<template>
  <div
    id="w-app-view"
    :style="{'--navigation-height-indent': $store.getters['system/applicationBaseNavigationCurrentHeightIndent']}"
  >
    <div class="title">
      Hello there{{$store.state.AUTHENTICATION.user?.email ? `, ${$store.state.AUTHENTICATION.user.email}` : ''}}! This is the "App Page".
    </div>
  </div>
</template>

<script>
export default {name: 'WAppView'}
</script>

<style lang="scss" scoped>
#w-app-view {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - var(--navigation-height-indent));
  width: 100%;

  & > .title {
    font-size: 1.25rem;
    padding: 0px 1rem;
    text-align: center;
    width: 100%;
  }
}
</style>