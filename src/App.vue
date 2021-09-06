<template>
  <KeepAlive>
    <Transition
      mode="out-in"
      name="layer-transition"
    >
      <Component :is="activeLayer"/>
    </Transition>
  </KeepAlive>
</template>

<script>
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ApplicationLayer from '@/components/core/layer/application.vue';
import ErrorLayer from '@/components/core/layer/error.vue';
import LoaderLayer from '@/components/core/layer/loader.vue';

export default {
  components: {
    ApplicationLayer,
    ErrorLayer,
    LoaderLayer
  },
  setup() {
    const $route = useRoute();
    const $store = useStore();

    const activeLayer = computed(function() {
      return {
        application: 'ApplicationLayer',
        error: 'ErrorLayer',
        loader: 'LoaderLayer',
      }[$store.state.SYSTEM.activeLayer];
    });

    addEventListener('resize', function() {
      $store.commit('SYSTEM/GLOBAL/WINDOW/SET_INNER_WIDTH', innerWidth);
    });

    watchEffect(function() {
      const systemChecks = [
        'applicationBaseNavigationPanelDisabled',
        'applicationBaseNavigationPanelForceLogo',
        'applicationBaseSidePanelDisabled'
      ]
        .reduce(function(accumulator, check) {
          accumulator[check] = $route.matched
            .some(function(match) {
              return match.meta.checks?.[check] === true;
            });
          return accumulator;
        }, {});

      $store.commit('SYSTEM/APPLICATION/BASE/NAVIGATION/SET_DISABLED', systemChecks.applicationBaseNavigationPanelDisabled);
      $store.commit('SYSTEM/APPLICATION/BASE/NAVIGATION/SET_FORCE_LOGO', systemChecks.applicationBaseNavigationPanelForceLogo);
      $store.commit('SYSTEM/APPLICATION/BASE/SIDE/SET_DISABLED', systemChecks.applicationBaseSidePanelDisabled);
    });

    return {activeLayer};
  }
}
</script>

<style lang="scss">
@import "~@/assets/fonts/Cascadia Code/style.css";
@import "~@/assets/fonts/Fira/style.css";
@import "~@/assets/fonts/Montserrat/style.css";
@import "~@/assets/fonts/Nunito/style.css";
@import "~@/assets/fonts/Poppins/style.css";

@import '~@/assets/icon-fonts/Brands/style.css';
@import '~@/assets/icon-fonts/Feather/style.css';
@import '~@/assets/icon-fonts/Material/style.css';
</style>

<style lang="scss">
*, *::before, *::after {
  box-sizing: border-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  transition-duration: var(--w-system-transition-duration);
  transition-property: none;
  transition-timing-function: ease-out;
}
html {
  font-family: var(--w-system-font-family), 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: calc(var(--w-system-zoom-factor) * 14px);
  overflow-x: hidden;
}
body {
  background-color: rgba(var(--w-color-background), 1);
  color: rgba(var(--w-color-text), 1);
  margin: 0rem;
  padding: 0rem;
  transition-property: background-color, color;
}
#app {
  width: 100%;
}
</style>

<style lang="scss">
.layer-transition-enter-active,
.layer-transition-leave-active {
  transform-origin: center !important;
  transition-property: opacity, transform !important;
}
.layer-transition-enter-from {
  opacity: 0;
  transform: scale(0.9) !important;
}
.layer-transition-leave-to {
  opacity: 0;
  transform: scale(1.1) !important;
}
.module-transition-enter-active,
.module-transition-leave-active {
  transform-origin: center;
  transition-property: opacity, transform !important;
}
.module-transition-enter-from,
.module-transition-leave-to {
  opacity: 0 !important;
  transform: translateY(-1.5rem);
}
.panel-transition-enter-active,
.panel-transition-leave-active {
  transition-property: opacity !important;
}
.panel-transition-enter-from,
.panel-transition-leave-to {
  opacity: 0 !important;
}
.router-view-transition-enter-active,
.router-view-transition-leave-active {
  transform-origin: center !important;
  transition-property: opacity, transform !important;
}
.router-view-transition-enter-from,
.router-view-transition-leave-to {
  opacity: 0 !important;
  transform: scale(0.9) !important;
}
.content-transition-enter-active,
.content-transition-leave-active {
  transition-property: opacity, transform !important;
}
.content-transition-enter-from,
.content-transition-leave-to {
  opacity: 0 !important;
  transform: scale(0.9) !important;
}
</style>

<style lang="scss">
[w-directive-scrollbar] {
  overflow: scroll !important;
  position: relative;
  
  &[w-directive-scrollbar-states-dragging] {
    user-select: none !important;
  }
  &[w-directive-scrollbar-states-has-pointer] {
    scrollbar-width: none !important;

    &::-webkit-scrollbar {
      height: 0px !important;
      width: 0px !important;
    }
  }

  & > .scroll-x {
    --self__height: 0.5rem;
    --self__offset: 0px;
    --self__opacity: 1;
    --self__pointer-events: auto;
    --self__width: calc(100% - var(--self__offset));
    --thumb__background-alpha: 0.5;
    --thumb__max-width: clamp(70%, var(--maximize-scroll-length), 100%);
    --thumb__min-width: clamp(5%, var(--minimum-scroll-length), 30%);

    &:where(.state\:scroll-y-active) {
      --self__offset: 0.8rem;
    }
    &:where(.state\:scroll-y-active.state\:scroll-y-hovered, .state\:scroll-y-active.state\:scroll-y-clicked) {
      --self__offset: 1rem;
    }
    &:where(.state\:hovered) {
      --self__height: 0.7rem;
      --thumb__background-alpha: 0.75;
    }
    &:where(.state\:hidden) {
      --self__opacity: 0;
      --self__pointer-events: none;
    }
    &:where(.state\:inactive) {
      --self__opacity: 0;
      --self__pointer-events: none;
    }
    &:where(.state\:clicked) {
      --self__height: 0.7rem;
      --self__opacity: 1;
      --self__pointer-events: auto;
      --thumb__background-alpha: 1;
    }
    &:where(.state\:disabled) {
      --self__opacity: 0;
      --self__pointer-events: none;
    }
  }
  & > .scroll-x {
    border-radius: 5px;
    bottom: calc(var(--anchor-y, 0px) + 0.15rem);
    box-shadow: 0px 0px 0px 1px rgba(var(--color), 0.35) inset, 0px 0px 4px 1px rgba(var(--color), 0.1);
    height: var(--self__height);
    opacity: var(--self__opacity);
    overflow: hidden;
    pointer-events: var(--self__pointer-events);
    position: absolute;
    right: calc(var(--anchor-x, 0px) + var(--self__offset) + 0.15rem);
    transition-property: box-shadow, height, opacity;
    width: calc(var(--self__width) - 0.3rem);

    & > .thumb {
      background-color: rgba(var(--color), var(--thumb__background-alpha));
      border-radius: 5px;
      height: 100%;
      left: var(--progress);
      max-width: var(--thumb__max-width);
      min-width: var(--thumb__min-width);
      position: absolute;
      top: 0px;
      transition-property: background-color, width;
      width: calc(var(--visible-length) / var(--total-length) * 100%);
    }
  }

  & > .scroll-y {
    --self__height: calc(100% - var(--self__offset));
    --self__offset: 0px;
    --self__opacity: 1;
    --self__pointer-events: auto;
    --self__width: 0.5rem;
    --thumb__background-alpha: 0.5;
    --thumb__max-height: clamp(70%, var(--maximize-scroll-length), 100%);
    --thumb__min-height: clamp(5%, var(--minimum-scroll-length), 30%);

    &:where(.state\:scroll-y-active) {
      --self__offset: 0.8rem;
    }
    &:where(.state\:scroll-x-active.state\:scroll-x-hovered, .state\:scroll-x-active.state\:scroll-x-clicked) {
      --self__offset: 1rem;
    }
    &:where(.state\:hovered) {
      --self__width: 0.7rem;
      --thumb__background-alpha: 0.75;
    }
    &:where(.state\:hidden) {
      --self__opacity: 0;
      --self__pointer-events: none;
    }
    &:where(.state\:inactive) {
      --self__opacity: 0;
      --self__pointer-events: none;
    }
    &:where(.state\:clicked) {
      --self__opacity: 1;
      --self__pointer-events: auto;
      --self__width: 0.7rem;
      --thumb__background-alpha: 1;
    }
    &:where(.state\:disabled) {
      --self__opacity: 0;
      --self__pointer-events: none;
    }
  }
  & > .scroll-y {
    border-radius: 5px;
    bottom: calc(var(--anchor-y, 0px) + var(--self__offset) + 0.15rem);
    box-shadow: 0px 0px 0px 1px rgba(var(--color), 0.35) inset, 0px 0px 4px 1px rgba(var(--color), 0.1);
    height: calc(var(--self__height) - 0.3rem);
    opacity: var(--self__opacity);
    overflow: hidden;
    pointer-events: var(--self__pointer-events);
    position: absolute;
    right: calc(var(--anchor-x, 0px) + 0.15rem);
    transition-property: box-shadow, opacity, width;
    width: var(--self__width);

    & > .thumb {
      background-color: rgba(var(--color), var(--thumb__background-alpha));
      border-radius: 5px;
      height: calc(var(--visible-length) / var(--total-length) * 100%);
      left: 0px;
      max-height: var(--thumb__max-height);
      min-height: var(--thumb__min-height);
      position: absolute;
      top: var(--progress);
      transition-property: background-color, width;
      width: 100%;
    }
  }
}
</style>
