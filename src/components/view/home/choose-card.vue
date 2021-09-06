<template>
  <div
    class="w-view-home-choose-card"
    :class="[
      {
        'state:focused': focused,
        'state:hovered': hovered
      }
    ]"
    :style="{
      '--foreground-contrast-color': foregroundContrastColor,
      '--primary-contrast-color': primaryContrastColor
    }"
  >
    <a
      class="content"
      href="#"
      @blur="focused = false;"
      @focus="focused = true;"
      @mouseleave="hovered = false;"
      @mouseover="hovered = true;"
    >
      <div class="icon">
        <slot name="icon"></slot>
      </div>
      <div class="text">
        <slot></slot>
      </div>
    </a>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { contrast } from '@/services/color';

export default {
  name: 'WViewHomeChooseCard',
  setup() {
    const focused = ref(false);
    const hovered = ref(false);

    const foregroundContrastColor = computed(function() {
      return contrast('foreground', 2);
    });
    const primaryContrastColor = computed(function() {
      return contrast('primary', 2);
    });

    return {
      focused,
      foregroundContrastColor,
      hovered,
      primaryContrastColor
    };
  }
}
</script>

<style lang="scss" scoped>
.w-view-home-choose-card {
  --content__background-color: var(--w-color-foreground);
  --content--icon__border-color: var(--foreground-contrast-color);
  --content--text__color: var(--foreground-contrast-color);

  &:where(.state\:focused, .state\:hovered) {
    --content__background-color: var(--w-color-primary);
    --content--icon__border-color: var(--primary-contrast-color);
    --content--text__color: var(--primary-contrast-color);
  }
}
.w-view-home-choose-card {
  overflow: hidden;
  width: 100%;
  
  & > .content {
    align-items: center;
    background-color: rgba(var(--content__background-color), 1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    max-width: 18rem;
    overflow: hidden;
    padding: 1rem;
    text-decoration: none;
    transition-property: background-color;
    width: 100%;

    & > .icon {
      border: 1px solid rgba(var(--content--icon__border-color), 1);
      border-radius: 50%;
      height: 6rem;
      padding: 1.5rem;
      transition-property: border;
      width: 6rem;
      z-index: 1;

      & > :deep(img) {
        height: 100%;
        object-fit: cover;
        object-position: center;
        width: 100%;
      }
    }
    & > .text {
      color: rgba(var(--content--text__color), 1);
      font-size: 1.2rem;
      font-weight: bold;
      padding: 2rem 0px 0px;
      text-align: center;
    }
  }
}
</style>