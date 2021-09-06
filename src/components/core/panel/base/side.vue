<template>
  <div
    :class="[
      {
        'state:auto-hide': $store.getters['SYSTEM/APPLICATION/BASE/SIDE/autoHide'],
        'state:expanded': $store.state.SYSTEM.APPLICATION.BASE.SIDE.expanded,
        'state:hovered': $store.state.SYSTEM.APPLICATION.BASE.SIDE.hovered,
        'state:toggler-hovered': togglerHovered
      }
    ]"
    id="w-core-panel-base-side"
    :style="{
      '--footer-ref-height': `${footerHeight}px`,
      '--header-ref-height': `${headerHeight}px`,
      '--side-width': $store.getters['SYSTEM/APPLICATION/BASE/SIDE/currentWidth'],
      '--primary-alter-color': primaryAlterColor
    }"
  >
    <div
      class="body"
      w-overlay="#w-core-panel-base-side > body-overlay"
      @mouseleave="$store.commit('SYSTEM/APPLICATION/BASE/SIDE/SET_HOVERED', false);"
      @mouseover="$store.commit('SYSTEM/APPLICATION/BASE/SIDE/SET_HOVERED', true);"
    >
      <div
        class="content"
        ref="body_content_ref"
        @scroll="
          if($refs.body_content_ref && $refs.body_overlay_ref) $refs.body_overlay_ref.scrollTop = $refs.body_overlay_ref.scrollTop;

          emitter.emit('update_w_panel_base_side_body_overlay');
        "
        v-scrollbar-directive:y
      ></div>
    </div>
    <div
      class="body-overlay"
      w-overlay-content="#w-core-panel-base-side > body-overlay > .content"
      :w-overlay-offset-bottom="footerHeight"
      w-overlay-offset-left="0"
      w-overlay-offset-right="0"
      :w-overlay-offset-top="headerHeight"
    >
      <div
        class="content"
        :style="{height: `${headerHeight + bodyContentScrollHeight + footerHeight}px`}"
      ></div>
    </div>
    <div
      class="footer"
      ref="footer_ref"
      @mouseleave="$store.commit('SYSTEM/APPLICATION/BASE/SIDE/SET_HOVERED', false);"
      @mouseover="$store.commit('SYSTEM/APPLICATION/BASE/SIDE/SET_HOVERED', true);"
    ></div>
    <div
      class="header"
      ref="header_ref"
      @mouseleave="$store.commit('SYSTEM/APPLICATION/BASE/SIDE/SET_HOVERED', false);"
      @mouseover="$store.commit('SYSTEM/APPLICATION/BASE/SIDE/SET_HOVERED', true);"
    >
      <div class="top">
        <div class="brand">
          <RouterLink
            class="logo"
            :to="{name: 'Home'}"
          >
            <svg class="wabisque-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 254.3">
              <g class="folds">
                <polygon class="dark fold-1" points="149.67 31 117.67 95 10.34 95 42.34 31 149.67 31"/>
                <polygon class="light fold-2" points="245.67 223 138.34 223 42.34 31 149.67 31 245.67 223"/>
                <polygon class="dark fold-3" points="341.67 31 245.67 223 138.34 223 234.34 31 341.67 31"/>
                <polygon class="light fold-4" points="437.67 223 330.34 223 234.34 31 341.67 31 437.67 223"/>
                <polygon class="dark fold-5" points="501.67 95 437.67 223 330.34 223 394.34 95 501.67 95"/>
              </g>
            </svg>
          </RouterLink>
          <div class="name">
            <svg
              class="image"
              height="100%"
              viewBox="0 0 84 14"
              width="100%"
            >
              <text
                class="text"
                text-anchor="middle"
                x="42"
                y="10.5"
              >
                web lib
              </text>
            </svg>
          </div>
        </div>
        <div
          class="toggler"
          @mouseleave="togglerHovered = false;"
          @mouseover="togglerHovered = true;"
          @click="$store.commit('SYSTEM/APPLICATION/BASE/SIDE/SET_EXPANDED', !$store.state.SYSTEM.APPLICATION.BASE.SIDE.expanded);"
        >
          <Transition
            mode="out-in"
            name="content-transition"
          >
            <IconComponent
              family="Material"
              name="menu"
              v-if="!$store.state.SYSTEM.APPLICATION.BASE.SIDE.expanded"
            ></IconComponent>
            <IconComponent
              family="Material"
              name="menu_open"
              v-else
            ></IconComponent>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect, ref } from 'vue';
import IconComponent from '@/components/icon.vue';
import ScrollbarDirective from '@/directives/scrollbar';
import { contrast } from '@/services/color';
import emitter from '@/services/emitter';

export default {
  components: {IconComponent},
  directives: {ScrollbarDirective},
  name: 'WCorePanelBaseSide',
  setup() {
    const body_content_ref = ref(null);
    const bodyContentScrollHeight = ref(0);
    const body_overlay_ref = ref(null);
    const footerHeight = ref(0);
    const footer_ref = ref(null);
    const headerHeight = ref(0);
    const header_ref = ref(null);
    const togglerHovered = ref(false);

    const bodyContentRefMutationObserver = new MutationObserver(function() {
      if(!body_content_ref.value) return;

      bodyContentScrollHeight.value = body_content_ref.value.scrollHeight;
      emitter.emit('w-core-panel-base-side-body-overlay:update');
    });
    const footerRefResizeObserver = new ResizeObserver(function() {
      if(!footer_ref.value) return;
      
      footerHeight.value = footer_ref.value.getBoundingClientRect().height;
    });
    const headerRefResizeObserver = new ResizeObserver(function() {
      if(!header_ref.value) return;
      
      headerHeight.value = header_ref.value.getBoundingClientRect().height;
    });

    const primaryAlterColor = computed(function() {
      return contrast('primary');
    });

    watchEffect(function() {
      if(body_content_ref.value) {
        bodyContentRefMutationObserver.observe(body_content_ref.value, {
          childList: true,
          subtree: true
        });
      }
      else bodyContentRefMutationObserver.disconnect();

      if (footer_ref.value) footerRefResizeObserver.observe(footer_ref.value, {box: 'border-box'});
      else footerRefResizeObserver.disconnect();
      
      if(header_ref.value) headerRefResizeObserver.observe(header_ref.value, {box: 'border-box'});
      else headerRefResizeObserver.disconnect();
    });

    return {
      body_content_ref,
      bodyContentScrollHeight,
      body_overlay_ref,
      emitter,
      footerHeight,
      footer_ref,
      headerHeight,
      header_ref,
      primaryAlterColor,
      togglerHovered
    };
  }
}
</script>

<style lang="scss" scoped>
#w-core-panel-base-side {
  --self__pointer-events: auto;
  --body__box-shadow: 0px 0px 7px 2px rgba(var(--w-color-shadow), 0.15);
  --body__width: var(--side-width);
  --header__width: var(--side-width);
  --header--top--brand--logo__width: 3rem;
  --header--top--brand--name__opacity: 0;
  --header--top--toggler__background-alpha: 0;
  --header--top--toggler__color: var(--w-color-primary);
  --header--top--toggler__opacity: 0;
  --header--top--toggler__pointer-events: none;
  --header--top--toggler__position: absolute;
  --header--top--toggler__right: 0.5rem;

  &:where(.state\:auto-hide) {
    --body__box-shadow: none;
  }
  &:where(.state\:toggler-hovered) {
    --header--top--toggler__background-alpha: 0.15;
  }
  &:where(.state\:hovered) {
    --body__box-shadow: 0px 0px 7px 2px rgba(var(--w-color-shadow), 0.15);
    --header--top--brand--logo__width: 2.5rem;
    --header--top--brand--name__opacity: 1;
    --header--top--toggler__opacity: 1;
    --header--top--toggler__pointer-events: auto;
    --header--top--toggler__position: relative;
    --header--top--toggler__right: unset;
  }
  &:where(.state\:expanded) {
    --body__box-shadow: 0px 0px 7px 2px rgba(var(--w-color-shadow), 0.15);
    --header--top--brand--logo__width: 2.5rem;
    --header--top--brand--name__opacity: 1;
    --header--top--toggler__background-alpha: 1;
    --header--top--toggler__color: var(--primary-alter-color);
    --header--top--toggler__opacity: 1;
    --header--top--toggler__pointer-events: auto;
    --header--top--toggler__position: relative;
    --header--top--toggler__right: unset;
  }
}
#w-core-panel-base-side {
  height: 100vh;
  left: 0px;
  overflow: hidden;
  pointer-events: none;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 3;

  & > * {
    pointer-events: var(--self__pointer-events);
  }

  & > .body {
    background-color: rgba(var(--w-color-aside-background), 1);
    box-shadow: var(--body__box-shadow);
    height: 100%;
    left: 0px;
    overflow: hidden;
    position: absolute;
    top: 0px;
    transition-property: background-color, box-shadow, width;
    width: var(--body__width);
    z-index: 1;

    & > .content {
      height: calc(100% - var(--footer-ref-height) - var(--header-ref-height));
      left: 0px;
      position: absolute;
      top: var(--header-ref-height);
      width: 100%;
    }
  }
  & > .body-overlay {
    height: 100%;
    left: 0px;
    overflow: hidden;
    pointer-events: none;
    top: 0px;
    width: 100%;
    z-index: 2;

    & > .content {
      overflow: hidden;
      position: relative;
      width: 100%;
    }
  }
  & > .header {
    left: 0px;
    overflow: hidden;
    position: absolute;
    top: 0px;
    transition-property: width;
    width: var(--header__width);
    z-index: 3;

    & > .top {
      align-items: center;
      display: flex;
      padding: 0.5rem;
      transition-property: padding;
      user-select: none;
      width: 100%;

      & > .brand {
        align-items: center;
        display: flex;
        flex: 1 1 auto;
        width: 100%;

        & > .logo {
          align-items: center;
          display: flex;
          flex: 0 0 auto;
          justify-content: center;
          transition-property: width;
          width: var(--header--top--brand--logo__width);

          & > .wabisque-logo > .folds {
            & > .dark {
              fill: rgba(var(--w-color-text), 1);
              transition-property: fill;
            }
            & > .light {
              fill: rgba(var(--w-color-primary), 1);
              transition-property: fill;
            }
          }
        }
        & > .name {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          font-weight: bold;
          font-size: 1rem;
          justify-content: center;
          margin: 0px var(--header--top--brand--name__margin-x);
          opacity: var(--header--top--brand--name__opacity);
          overflow: hidden;
          text-transform: uppercase;
          transition-property: opacity, margin, width;
          white-space: nowrap;
          width: 100%;

          & > .image {
            height: 100%;
            object-fit: contain;
            object-position: center;
            width: 100%;

            & > .text {
              fill: rgba(var(--w-color-text), 1);
              font-size: 9px;
            }
          }
        }
      }
      & > .toggler {
        align-items: center;
        background-color: rgba(var(--w-color-primary), var(--header--top--toggler__background-alpha));
        border: 1px solid rgba(var(--w-color-primary), 1);
        border-radius: 50%;
        color: rgba(var(--header--top--toggler__color), 1);
        cursor: pointer;
        display: flex;
        flex: 0 0 auto;
        font-size: 1.15rem;
        height: 1.75rem;
        justify-content: center;
        opacity: var(--header--top--toggler__opacity);
        overflow: hidden;
        pointer-events: var(--header--top--toggler__pointer-events);
        position: var(--header--top--toggler__position);
        right: var(--header--top--toggler__right);
        transition-property: background-color, border, color, opacity;
        width: 1.75rem;
      }
    }
  }
}
</style>