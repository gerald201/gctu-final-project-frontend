<template>
  <div
    class="w-view-home-category-card"
    :class="[
      {
        'state:focused': focused,
        'state:hovered': hovered
      }
    ]"
    :style="{
      '--black-contrast-color': blackContrastColor,
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
      <div class="image">
        <slot name="image"></slot>
        <div class="overlay">
          +
        </div>
      </div>
      <div class="text">
        <div class="content">
          <slot></slot>
        </div>
        <div class="pointer"></div>
      </div>
    </a>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { contrast } from '@/services/color';

export default {
  name: 'WViewHomeCategoryCard',
  setup() {
    const focused = ref(false);
    const hovered = ref(false);

    const blackContrastColor = computed(function() {
      return contrast('black');
    });
    const foregroundContrastColor = computed(function() {
      return contrast('foreground');
    });
    const muteContrastColor = computed(function() {
      return contrast('mute');
    });
    const primaryContrastColor = computed(function() {
      return contrast('primary');
    });

    return {
      blackContrastColor,
      focused,
      foregroundContrastColor,
      hovered,
      muteContrastColor,
      primaryContrastColor
    };
  }
}
</script>

<style lang="scss" scoped>
.w-view-home-category-card {
  --content--image-wrapper--overlay__opacity: 0;
  --content--text__background-color: var(--w-color-foreground);
  --content--text__color: var(--foreground-contrast-color);
  --content--text--pseudobefore__opacity: 0;

  &:where(.state\:focused, .state\:hovered) {
    --content--image-wrapper--overlay__opacity: 1;
    --content--text__background-color: var(--w-color-primary);
    --content--text__color: var(--primary-contrast-color);
    --content--text--pseudobefore__opacity: 1;
  }
}
.w-view-home-category-card {
  overflow: hidden;
  width: 100%;
  
  & > .content {
    border-radius: 5px;
    display: block;
    margin: 0px auto;
    max-width: 22rem;
    overflow: hidden;
    text-decoration: none;
    width: 100%;

    & > .image {
      position: relative;
      height: 22rem;
      width: 100%;
      z-index: 1;

      & > :deep(img) {
        height: 100%;
        object-fit: cover;
        object-position: center;
        width: 100%;
      }
      & > .overlay {
        align-items: center;
        background-color: rgba(var(--w-color-black), 0.75);
        color: rgba(var(--black-contrast-color), 1);
        display: flex;
        font-size: 5rem;
        font-weight: lighter;
        height: 100%;
        justify-content: center;
        left: 0px;
        opacity: var(--content--image-wrapper--overlay__opacity);
        position: absolute;
        top: 0px;
        transition-property: background-color, color, opacity;
        width: 100%;
      }
    }
    & > .text {
      background-color: rgba(var(--content--text__background-color), 1);
      color: rgba(var(--content--text__color), 1);
      display: flex;
      justify-content: center;
      padding: 1.5rem 1rem;
      position: relative;
      transition-property: background-color, color;
      z-index: 2;

      &::before {
        border: 1.5rem solid transparent;
        border-bottom-color: rgba(var(--w-color-primary), 1);
        bottom: 100%;
        content: "";
        opacity: var(--content--text--pseudobefore__opacity);
        position: absolute;
        transition-property: border, opacity;
      }
      & > .content {
        font-weight: bold;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }
    }
  }
}
</style>