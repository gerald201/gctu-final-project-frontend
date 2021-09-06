<template>
  <div
    class="w-button-action"
    :class="[
      `attr:appearance:${cleanedAppearance}`,
      `attr:size:${cleanedSize}`,
      {
        'attr:evened': evened,
        'state:clicked': clicked,
        'state:hovered': hovered
      }
    ]"
    :style="{
      '--text-color': cleanedTextColor,
      '--theme-color': cleanedThemeColor
    }"
    v-bind="baseAttrs"
  >
    <button
      class="button"
      ref="button_ref"
      @click="
        clicked = true;
        setBackground($event);
        setPulse($event);
      "
      @mouseleave="hovered = false;"
      @mouseover="hovered = true;"
      v-bind="otherAttrs"
    >
      <span class="content">
        <slot></slot>
      </span>
      <Transition
        mode="out-in"
        name="content-transition"
      >
        <div
          class="border"
          v-if="cleanedAppearance == 'bordered'"
        ></div>
      </Transition>
    </button>
  </div>
</template>

<script>
import { computed, onDeactivated, ref } from 'vue';
import { contrast, toCleanRgb } from '@/services/color';

export default {
  inheritAttrs: false,
  name: 'WButtonAction',
  props: {
    appearance: {
      required: false,
      type: String
    },
    evened: {
      required: false,
      type: Boolean
    },
    size: {
      required: false,
      type: String
    },
    textColor: {
      required: false,
      type: String
    },
    themeColor: {
      required: false,
      type: String
    }
  },
  setup(props, context) {
    const button_ref = ref(null);
    const clicked = ref(false);
    const hovered = ref(false);

    const backgroundElement = document.createElement('div');
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
    const cleanedAppearance = computed(function() {
      const valid = [
        'default',
        'bordered',
        'flat'
      ];

      return valid.includes(props.appearance) ? props.appearance : 'default';
    });
    const cleanedSize = computed(function() {
      const valid = [
        'small',
        'medium',
        'large'
      ];

      return valid.includes(props.size) ? props.size : 'medium';
    });
    const cleanedTextColor = computed(function() {
      return toCleanRgb(props.textColor) || contrast(cleanedThemeColor.value, 2);
    });
    const cleanedThemeColor = computed(function() {
      return toCleanRgb(props.themeColor) || toCleanRgb('primary');
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

    function setBackground(event) {
      const valid = [
        'bordered',
        'flat'
      ];

      if(!valid.includes(cleanedAppearance.value)) return;

      if(!(button_ref.value && event)) return;

      const size = 2 * Math.sqrt(button_ref.value.getBoundingClientRect().height ** 2 + button_ref.value.getBoundingClientRect().width ** 2);
      const clientX = event.clientX ? event.clientX : button_ref.value.getBoundingClientRect().left + 0.5 * button_ref.value.getBoundingClientRect().width;
      const clientY = event.clientY ? event.clientY : button_ref.value.getBoundingClientRect().top + 0.5 * button_ref.value.getBoundingClientRect().height;

      if(button_ref.value.contains(backgroundElement)) button_ref.value.removeChild(backgroundElement);

      backgroundElement.style.left = `${clientX - button_ref.value.getBoundingClientRect().left - 0.5 * size}px`;
      backgroundElement.style.top = `${clientY - button_ref.value.getBoundingClientRect().top - 0.5 * size}px`;
      backgroundElement.style.height = `${size}px`;
      backgroundElement.style.width = `${size}px`;
      button_ref.value.appendChild(backgroundElement);
    }

    function setPulse(event) {
      if(cleanedAppearance.value != 'default') return;

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

    backgroundElement.classList.toggle('background', true);
    pulseElement.classList.toggle('pulse', true);
    
    addEventListener('click', function(event) {
      if(event.target.closest('.w-button-action .button') != button_ref.value) {
        clicked.value = false;
        hovered.value = false;
      }
    });

    onDeactivated(function() {
      clicked.value = false;
      hovered.value = false;
    });

    return {
      baseAttrs,
      button_ref,
      cleanedAppearance,
      cleanedSize,
      cleanedTextColor,
      cleanedThemeColor,
      clicked,
      hovered,
      otherAttrs,
      setBackground,
      setPulse
    }
  }
};
</script>

<style lang="scss" scoped>
.w-button-action {
  --self__base-size: 0.85rem;
  --self__pointer-events: auto;
  --button__background-alpha: 1;
  --button__box-shadow: none;
  --button__color: var(--text-color);
  --button__padding: var(--self__base-size) calc(1.5 * var(--self__base-size));
  --button--background__opacity: 0;

  &:where(.state\:hovered) {
    --button__box-shadow: 0px 0px 4px 1px rgba(var(--theme-color), 0.5);
  }
  &:where(.attr\:appearance\:bordered, .attr\:appearance\:flat) {
    --button__background-alpha: 0;
    --button__box-shadow: none;
    --button__color: var(--theme-color);
  }
  &:where(.attr\:appearance\:bordered.state\:hovered, .attr\:appearance\:flat.state\:hovered) {
    --button__background-alpha: 0.25;
  }
  &:where(.attr\:appearance\:bordered.state\:clicked, .attr\:appearance\:flat.state\:clicked) {
    --button__background-alpha: 0;
    --button__color: var(--text-color);
    --button--background__opacity: 1;
  }
  &:where(.attr\:evened) {
    --button__padding: var(--self__base-size);
  }
  &:where(.attr\:size\:small) {
    --self__base-size: 0.5rem;
  }
  &:where(.attr\:size\:large) {
    --self__base-size: 1.2rem;
  }
}
.w-button-action {
  display: inline-block;
  padding: 0.5rem;
  pointer-events: none;

  & > .button {
    background-color: rgba(var(--theme-color), var(--button__background-alpha));
    border: none;
    border-radius: 5px;
    box-shadow: var(--button__box-shadow);
    color: rgba(var(--button__color), 1);
    cursor: pointer;
    font-size: 0.9rem;
    overflow: hidden;
    padding: var(--button__padding);
    pointer-events: var(--self__pointer-events);
    position: relative;
    text-overflow: ellipsis;
    transition-property: background-color, box-shadow, color;
    width: 100%;
    white-space: nowrap;

    & > * {
      pointer-events: none;
    }
    & > :deep(.background) {
      animation: button--background calc(var(--w-system-transition-duration) * 2.5) ease-out forwards;
      background-color: rgba(var(--theme-color), 1);
      border-radius: 50%;
      opacity: var(--button--background__opacity);
      pointer-events: none;
      position: absolute;
      transition-property: background-color, opacity;
      z-index: 1;
    }
    & > :deep(.pulse) {
      animation: button--pulse calc(var(--w-system-transition-duration) * 2.5) ease-out forwards;
      background-color: rgba(var(--text-color), 1);
      border-radius: 50%;
      pointer-events: none;
      position: absolute;
      z-index: 3;
    }
    & > .content {
      position: relative;
      z-index: 2;
    }
    & > .border {
      border: 1px solid rgba(var(--theme-color), 1);
      border-radius: 5px;
      height: 100%;
      left: 0px;
      position: absolute;
      top: 0px;
      width: 100%;
      z-index: 4;
    }
  }
}

@keyframes button--background {
  0% {
    opacity: 0.25;
    transform: scale(0.1);
  }
  100% {
    transform: none;
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