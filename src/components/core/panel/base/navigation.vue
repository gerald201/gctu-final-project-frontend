<template>
  <div
    :class="[
      {'state:toggler-hovered': togglerHovered}
    ]"
    id="w-core-panel-base-navigation"
    :style="{
      '--annex-pointer-left': annexPointerLeft,
      '--navigation-offset': $store.getters['SYSTEM/APPLICATION/BASE/NAVIGATION/currentOffset']
    }"
  >
    <div
      class="body"
      w-overlay="#w-core-panel-base-navigation > .body-overlay"
    >
      <Transition name="content-transition">
        <div
          class="static"
          v-if="$store.getters['SYSTEM/APPLICATION/BASE/SIDE/autoHide'] || $store.state.SYSTEM.APPLICATION.BASE.SIDE.disabled"
        >
          <Transition name="content-transition">
            <div
              class="toggler"
              @mouseleave="togglerHovered = false;"
              @mouseover="togglerHovered = true;"
              @click="$store.commit('SYSTEM/APPLICATION/BASE/SIDE/SET_EXPANDED', !$store.state.SYSTEM.APPLICATION.BASE.SIDE.expanded);"
              v-if="$store.getters['SYSTEM/APPLICATION/BASE/SIDE/autoHide'] && !$store.state.SYSTEM.APPLICATION.BASE.SIDE.disabled"
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
          </Transition>
          <Transition name="content-transition">
            <RouterLink
              class="logo"
              :to="{name: 'Home'}"
              v-if="$store.getters['SYSTEM/APPLICATION/BASE/SIDE/autoHide'] || $store.state.SYSTEM.APPLICATION.BASE.SIDE.disabled"
            >
              <svg class="logo-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 254.3">
                <g class="folds">
                  <polygon class="dark fold-1" points="149.67 31 117.67 95 10.34 95 42.34 31 149.67 31"/>
                  <polygon class="light fold-2" points="245.67 223 138.34 223 42.34 31 149.67 31 245.67 223"/>
                  <polygon class="dark fold-3" points="341.67 31 245.67 223 138.34 223 234.34 31 341.67 31"/>
                  <polygon class="light fold-4" points="437.67 223 330.34 223 234.34 31 341.67 31 437.67 223"/>
                  <polygon class="dark fold-5" points="501.67 95 437.67 223 330.34 223 394.34 95 501.67 95"/>
                </g>
              </svg>
            </RouterLink>
          </Transition>
        </div>
      </Transition>
      <Transition
        mode="out-in"
        name="content-transition"
      >
        <div
          class="content"
          v-scrollbar-directive:x
          v-if="!annexInUse"
        >
          <TransitionGroup
            appear
            name="navigation-content"
          >
            <Component
              :is="item.component"
              :key="`w-core-panel-navigation-content-item-${item.index}`"
              v-bind="item.props"
              v-for="item in contentItems"
            ></Component>
          </TransitionGroup>
        </div>
        <div
          class="content"
          v-else  
        ></div>
      </Transition>
      <Transition name="content-transition">
        <NavigationActionComponent
          class="annex-toggler"
          :forced-clicked="annexActive"
          icon-name="more-vertical"
          ref="annex_toggler_ref"
          @click="annexActive = !annexActive;"
          v-if="annexInUse"
        ></NavigationActionComponent>
      </Transition>
    </div>
    <div
      class="body-overlay"
      w-overlay-content="#w-core-panel-base-navigation > .body-overlay > .content"
      w-overlay-offset-bottom="0"
      :w-overlay-offset-left="widthOffset"
      w-overlay-offset-right="0"
      w-overlay-offset-top="0"
    >
      <div class="content"></div>
    </div>
    <KeepAlive>
      <Transition name="content-transition">
          <div
            class="annex"
            ref="annex_ref"
            v-if="annexActive"
          >
            <div class="pointer"></div>
            <div
              class="content"
              v-scrollbar-directive:x
            >
              <TransitionGroup
                appear
                name="navigation-content"
              >
                <Component
                  :is="item.component"
                  :key="`w-core-panel-navigation-content-item-${item.index}`"
                  v-bind="item.props"
                  v-for="item in contentItems"
                ></Component>
              </TransitionGroup>
            </div>
          </div>
      </Transition>
    </KeepAlive>
  </div>
</template>

<script>
import { computed, watch, watchEffect, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import NavigationActionComponent from '@/components/navigation/action.vue';
import NavigationAnchorComponent from '@/components/navigation/anchor.vue';
import IconComponent from '@/components/icon.vue';
import ScrollbarDirective from '@/directives/scrollbar';

export default {
  components: {
    IconComponent,
    NavigationActionComponent,
    NavigationAnchorComponent
  },
  directives: {ScrollbarDirective},
  name: 'WCorePanelBaseNavigation',
  setup() {
    const $route = useRoute();
    const $router = useRouter();
    const $store = useStore();

    const annexActive = ref(false);
    const annexPointerLeft = ref('0px');
    const annex_ref = ref(null);
    const annex_toggler_ref = ref(null);
    const appLinkEnabledCheck = ref(false);
    const togglerHovered = ref(false);

    const annexPositionObserver = new PositionObserver(function() {
      if(!annex_ref.value || !annex_toggler_ref.value?.button_ref) {
        annexPointerLeft.value = '0px';
        return;
      }

      annexPointerLeft.value = `${annex_toggler_ref.value.button_ref.getBoundingClientRect().left + annex_toggler_ref.value.button_ref.clientWidth * 0.5}px`;
    });
    const annexResizeObserver = new ResizeObserver(function() {
      if(!annex_ref.value || !annex_toggler_ref.value?.button_ref) {
        annexPointerLeft.value = '0px';
        return;
      }

      annexPointerLeft.value = `${annex_toggler_ref.value.button_ref.getBoundingClientRect().left + annex_toggler_ref.value.button_ref.clientWidth * 0.5}px`;
    });

    const annexInUse = computed(function() {
      const smBreakPointIndex = $store.getters['SYSTEM/GLOBAL/activeResponsiveBreakPoints']
        .findIndex(function(breakPoint) {
          return breakPoint == 'sm';
        });

      return smBreakPointIndex <= 0;
    });
    const contentItems = computed(function() {
      return [
        {
          component: 'NavigationAnchorComponent',
          condition: $store.getters['AUTHENTICATION/isAuthenticated'] && appLinkEnabledCheck.value,
          index: 0,
          props: {
            iconName: 'grid',
            to: {name: 'App'}
          }
        },
        {
          component: 'NavigationActionComponent',
          condition: !$store.getters['AUTHENTICATION/isAuthenticated'],
          index: 1,
          props: {
            iconName: 'log-in',
            onclick() {
              $store.commit('SYSTEM/APPLICATION/SET_ACTIVE_MODULE', 'authentication');
            }
          }
        },
        {
          component: 'NavigationActionComponent',
          condition: $store.getters['AUTHENTICATION/isAuthenticated'],
          index: 2,
          props: {
            iconName: 'settings',
            onclick() {
              $store.commit('SYSTEM/APPLICATION/SET_ACTIVE_MODULE', 'settings');
            }
          }
        },
        {
          component: 'NavigationActionComponent',
          condition: $store.getters['AUTHENTICATION/isAuthenticated'],
          index: 4,
          props: {
            iconName: 'log-out',
            onclick() {
              signOut();
            },
            themeColor: 'danger'
          }
        }
      ]
        .filter(function(item) {
          return item.condition;
        });
    });
    const widthOffset = computed(function() {
      const map = {
        px: 1,
        rem: parseFloat(getComputedStyle(document.documentElement).fontSize.replace('px', ''))
      };
      const match = $store.getters['SYSTEM/APPLICATION/BASE/NAVIGATION/currentOffset'].match(/^(\d+)(px|rem)$/);

      return parseFloat(match[1]) * map[match[2]];
    });

    async function signOut() {
      try {
        await $store.dispatch('AUTHENTICATION/signOut');
      } finally {
        if(!$store.getters['AUTHENTICATION/isAuthenticated']) {
          const currentRoute = $route;

          await $router.push('/_');
          await $router.push(currentRoute);
        }
      }
    }

    watch(annexInUse, function(value) {
      if(!value) annexActive.value = false;
    });

    watchEffect(function() {
      if(annex_ref.value) {
        annexPositionObserver.observe(annex_ref.value);
        annexResizeObserver.observe(annex_ref.value, {box: 'border-box'});
      } else {
        annexPositionObserver.disconnect();
        annexResizeObserver.disconnect();
      }
    });

    watchEffect(function() {
      appLinkEnabledCheck.value = $route.matched
        .some(function(matched) {
          return matched.meta?.checks?.applicationBaseNavigationPanelAppLinkEnabled == true;
        });
    });

    addEventListener('click', function(event) {
      if(event.target.closest('.annex-toggler') != annex_toggler_ref.value?.$el) annexActive.value = false;
    });

    return {
      annexActive,
      annexInUse,
      annexPointerLeft,
      annex_ref,
      annex_toggler_ref,
      appLinkEnabledCheck,
      contentItems,
      togglerHovered,
      widthOffset
    };
  }
}
</script>

<style lang="scss" scoped>
#w-core-panel-base-navigation {
  --self__pointer-events: auto;
  --body--static--toggler__background-alpha: 0;
  --body--static--toggler__color: var(--w-color-primary);

  &:where(.state\:toggler-hovered) {
    --body--static--toggler__background-alpha: 0.15;
  }
  &:where(.state\:side-panel-expanded) {
    --body--static--toggler__background-alpha: 1;
    --body--static--toggler__color: var(--primary-alter-color);
  }
}
#w-core-panel-base-navigation {
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
    transition-property: background-color, box-shadow, width;
    width: calc(100% - var(--navigation-offset));
    z-index: 1;

    & > .static {
      align-items: center;
      display: flex;
      flex: 0 0 auto;
      height: 100%;
      padding: 0px 1rem;
      padding-right: 0.5rem;

      & > .toggler {
        align-items: center;
        background-color: rgba(var(--w-color-primary), var(--body--static--toggler__background-alpha));
        border: 1px solid rgba(var(--w-color-primary), 1);
        border-radius: 50%;
        color: rgba(var(--body--static--toggler__color), 1);
        cursor: pointer;
        display: flex;
        flex: 0 0 auto;
        font-size: 1.15rem;
        height: 1.75rem;
        justify-content: center;
        overflow: hidden;
        position: relative;
        transition-property: background-color, border, color;
        width: 1.75rem;
      }
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
      height: 100%;
      justify-content: flex-end;
      padding: 0px 1rem;
      padding-left: 0.5rem;
      width: 100%;
    }
    & > .annex-toggler {
      flex: 0 0 auto;
      padding: 0px 1rem;
      padding-left: 0.5rem;
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
  & > .annex {
    height: 5rem;
    padding: 0.5rem;
    pointer-events: none;
    position: absolute;
    top: 4rem;
    transition-property: width;
    width: 100%;
    z-index: 3;

    & > .pointer {
      border: 0.5rem solid transparent;
      border-bottom-color: rgba(var(--w-color-nav-background), 1);
      height: 0px;
      left: calc(var(--annex-pointer-left) - 0.5rem);
      position: absolute;
      top: -0.5rem;
      transition-property: border;
      width: 0px;
      z-index: 1;
    }
    & > .content {
      align-items: center;
      background-color: rgba(var(--w-color-nav-background), 1);
      border-radius: 5px;
      box-shadow: 0px 0px 4px 1px rgba(var(--w-color-shadow), 0.1);
      display: flex;
      height: 100%;
      pointer-events: auto;
      position: relative;
      right: 0px;
      top: 0px;
      transition-property: background-color, box-shadow;
      width: 100%;
      z-index: 2;
    }
  }
}

.navigation-content-enter-from,
.navigation-content-leave-to {
  opacity: 0 !important;
  transform: scale(0.9) !important;
}
.navigation-content-enter-active,
.navigation-content-leave-active {
  transition-property: opacity, transform !important;
}
.navigation-content-leave-active {
  position: absolute !important;
}
.navigation-content-move {
  transition-property: transform !important;
}
</style>