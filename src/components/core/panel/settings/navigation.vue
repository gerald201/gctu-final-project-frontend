<template>
  <div id="w-core-panel-settings-navigation">
    <div
      class="body"
      w-overlay="#w-core-panel-settings-navigation > .body-overlay"
    >
      <div class="static">
        <ButtonActionComponent
          appearance="flat"
          class="button"
          evened
          size="small"
          :theme-color="navBackgroundContrastColor"
          @click="$store.commit('SYSTEM/APPLICATION/SET_ACTIVE_MODULE', 'base');"
        >
          <IconComponent name="arrow-left"/>
        </ButtonActionComponent>
        <div class="logo">
          <svg class="logo-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 254.3">
            <g class="folds">
              <polygon class="dark fold-1" points="149.67 31 117.67 95 10.34 95 42.34 31 149.67 31"/>
              <polygon class="light fold-2" points="245.67 223 138.34 223 42.34 31 149.67 31 245.67 223"/>
              <polygon class="dark fold-3" points="341.67 31 245.67 223 138.34 223 234.34 31 341.67 31"/>
              <polygon class="light fold-4" points="437.67 223 330.34 223 234.34 31 341.67 31 437.67 223"/>
              <polygon class="dark fold-5" points="501.67 95 437.67 223 330.34 223 394.34 95 501.67 95"/>
            </g>
          </svg>
        </div>
      </div>
      <div class="content">
        SETTINGS
      </div>
    </div>
    <div
      class="body-overlay"
      w-overlay-content="#w-core-panel-settings-navigation > .body-overlay > .content"
      w-overlay-offset-bottom="0"
      w-overlay-offset-left="0"
      w-overlay-offset-right="0"
      w-overlay-offset-top="0"
    >
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import ButtonActionComponent from '@/components/button/action.vue';
import IconComponent from '@/components/icon.vue';
import { contrast } from '@/services/color';

export default {
  components: {
    ButtonActionComponent,
    IconComponent
  },
  name: 'WCorePanelSettingsNavigation',
  setup() {
    const navBackgroundContrastColor = computed(function() {
      return contrast('navBackground', 2);
    });

    return {navBackgroundContrastColor};
  }
}
</script>

<style lang="scss" scoped>
#w-core-panel-settings-navigation {
  --self__pointer-events: auto;
}
#w-core-panel-settings-navigation {
  height: 100vh;
  left: 0px;
  pointer-events: none;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 2;

  & > * {
    pointer-events: var(--self__pointer-events);
  }
  & > .body {
    align-items: center;
    background-color: rgba(var(--w-color-nav-background), 1);
    box-shadow: 0px 0px 7px 2px rgba(var(--w-color-shadow), 0.15);
    display: flex;
    height: 4rem;
    position: absolute;
    right: 0px;
    top: 0px;
    transition-property: background-color, box-shadow;
    width: 100%;
    z-index: 1;

    & > .static {
      align-items: center;
      display: flex;
      flex: 0 0 auto;
      height: 100%;
      padding: 0px 1rem;
      padding-right: 0.5rem;

      & > .logo {
        align-items: center;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
        transition-property: width;
        width: 3rem;

        & > .logo-image > .folds {
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
      & > * + * {
        padding-left: 0.5rem;
      }
    }
    & > .content {
      align-items: center;
      display: flex;
      flex: 1 1 auto;
      font-weight: bold;
      height: 100%;
      justify-content: center;
      padding: 0px 1rem;
      padding-left: 0.5rem;
      width: 100%;
    }
  }
  & > .body-overlay {
    height: 100%;
    left: 0px;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 2;

    & > .content {
      height: 100%;
      overflow: hidden;
      position: relative;
      width: 100%;
    }
  }
}
</style>