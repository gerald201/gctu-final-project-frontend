<template>
  <div
    class="w-navigation-anchor"
    :class="[
      {
        'state:disabled': disabled,
        'state:forced-clicked': forcedClicked,
        'state:hovered': hovered
      }
    ]"
    :style="{'--theme-color': cleanedThemeColor}"
    v-bind="baseAttrs"
  >
    <button
      class="button"
      ref="button_ref"
      @click="
        setPulse($event);
        navigate($event);
      "
      @mousedown="clicked = true;"
      @mouseleave="
        clicked = false;
        hovered = false;
      "
      @mouseover="hovered = true;"
      @mouseup="clicked = false;"
      v-bind="otherAttrs"
    >
      <IconComponent
        class="content"
        :family="cleanedIconFamily"
        :name="cleanedIconName"
      ></IconComponent>
      <Transition
        mode="out-in"
        name="content-transition"
      >
        <div
          class="border"
          v-if="clicked || forcedClicked"
        ></div>
      </Transition>
    </button>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { RouterLink, useLink } from 'vue-router';
import IconComponent from '@/components/icon.vue';
import { contrast, toCleanRgb } from '@/services/color';

export default {
  components: {IconComponent},
  inheritAttrs: false,
  name: 'WNavigationAnchor',
  props: {
    ...RouterLink.props,
    disabled: Boolean,
    forcedClicked: Boolean,
    iconFamily: String,
    iconName: String,
    themeColor: String
  },
  setup(props, context) {
    const $link = useLink(props);

    const button_ref = ref(null);
    const clicked = ref(false);
    const hovered = ref(false);

    const pulseElement = document.createElement('div');

    const baseAttrs = computed(function() {
      return Object.entries(context.attrs)
        .filter(function([key]) {
          return ['class', 'style'].includes(key);
        })
        .reduce(function(previous, [key, val]) {
          previous[key] = val;
          return previous;
        }, {});
    });
    const cleanedIconFamily = computed(function() {
      return props.iconFamily || '';
    });
    const cleanedIconName = computed(function() {
      return props.iconName || '';
    });
    const cleanedThemeColor = computed(function() {
      return toCleanRgb(props.themeColor) || contrast('navBackground', 2);
    });
    const otherAttrs = computed(function() {
      return Object.entries(context.attrs)
        .filter(function([key]) {
          return !['class', 'style'].includes(key);
        })
        .reduce(function(previous, [key, val]) {
          previous[key] = val;
          return previous;
        }, {});
    });

    function setPulse(event) {
      if(!(button_ref.value && event)) return;

      const size = Math.sqrt(button_ref.value.getBoundingClientRect().height ** 2 + button_ref.value.getBoundingClientRect().width ** 2);
      const clientX = event.clientX ? event.clientX : button_ref.value.getBoundingClientRect().left + 0.5 * button_ref.value.getBoundingClientRect().width;
      const clientY = event.clientY ? event.clientY : button_ref.value.getBoundingClientRect().top + 0.5 * button_ref.value.getBoundingClientRect().height;

      if(button_ref.value.contains(pulseElement)) button_ref.value.removeChild(pulseElement);

      pulseElement.style.left = `${clientX - button_ref.value.getBoundingClientRect().left - 0.5 * size}px`;
      pulseElement.style.top = `${clientY - button_ref.value.getBoundingClientRect().top - 0.5 * size}px`;
      pulseElement.style.height = `${size}px`;
      pulseElement.style.width = `${size}px`;
      button_ref.value.appendChild(pulseElement);
    }

    pulseElement.classList.toggle('pulse', true);

    addEventListener('mouseup', function(event) {
      clicked.value = false;
      hovered.value = event.target.closest('.button') == button_ref.value ? hovered.value : false;
    });

    return {
      baseAttrs,
      button_ref,
      cleanedIconFamily,
      cleanedIconName,
      cleanedThemeColor,
      clicked, 
      hovered,
      navigate: $link.navigate,
      otherAttrs,
      setPulse
    };
  }
}
</script>

<style lang="scss" scoped>
.w-navigation-anchor {
  --self__opacity: 1;
  --self__pointer-events: auto;
  --button__background-alpha: 0;

  &:where(.state\:hovered, .state\:forced-clicked) {
    --button__background-alpha: 0.25;
  }
  &:where(.state\:disabled) {
    --self__opacity: 0.5;
    --self__pointer-events: none;
  }
}
.w-navigation-anchor {
  display: inline-block;
  opacity: var(--self__opacity);
  padding: 0px 0.25rem;
  pointer-events: none;
  transition-property: opacity;

  & > .button {
    align-items: center;
    background-color: rgba(var(--theme-color), var(--button__background-alpha));
    border: none;
    border-radius: 50%;
    display: flex;
    height: 2.5rem;
    justify-content: center;
    overflow: hidden;
    pointer-events: var(--self__pointer-events);
    position: relative;
    transition-property: background-color;
    width: 2.5rem;

    & > .content {
      color: rgba(var(--theme-color), 1);
      transition-property: color;
      z-index: 1;
    }
    & > :deep(.pulse) {
      animation: button--pulse calc(var(--w-system-transition-duration) * 2.5) ease-out forwards;
      background-color: rgba(var(--theme-color), 1);
      border-radius: 50%;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }
    & > .border {
      border: 1px solid rgba(var(--theme-color), 1);
      border-radius: 50%;
      height: 100%;
      left: 0px;
      position: absolute;
      top: 0px;
      width: 100%;
      z-index: 3;
    }
  }
}

@keyframes button--pulse {
  0% {
    opacity: 0.15;
    transform: scale(0.1);
  }
  100% {
    opacity: 0;
    transform: none;
  }
}
</style>