<template>
  <div
    class="w-accordion"
    :class="[
      {'state:opened': opened}
    ]"
    :style="{
      '--content-size': contentSize,
      '--theme-color': cleanedThemeColor,
      '--theme-contrast-color': themeContrastColor
    }"
  >
    <div class="wrapper">
      <button
        class="toggler"
        @click="opened = !opened;"
      >
        <div class="label">
          <slot name="label">My Accordion Label</slot>
        </div>
        <div class="icon">
          <IconComponent name="chevron-down"></IconComponent>
        </div>
      </button>
      <div
        class="content-container"
        ref="content_container_ref"
      >
        <div class="separator"></div>
        <KeepAlive>
          <Transition name="content-transition">
            <div
              class="content"
              ref="content_ref"
              v-if="opened"
            >
              <slot>My Accordion Content</slot>
            </div>
          </Transition>
        </KeepAlive>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect, watch, ref } from 'vue';
import IconComponent from '@/components/icon.vue';
import { contrast, toCleanRgb } from '@/services/color';
import emitter from '@/services/emitter';

const idGenerator = (function*() {
  let increment = 0;
  
  while(true) {
    yield `w-accordion-${increment}`;
    increment++;
  }
})();

export default {
  components: {IconComponent},
  name: 'WAccordion',
  props: {
    themeColor: {
      required: false,
      type: String
    },
    toggleGroup: {
      required: false,
      type: String
    }
  },
  setup(props) {
    const content_ref = ref(null);
    const contentSize = ref('0px');
    const opened = ref(false);
    const recentContentSize = ref('0px');
    const wid = ref(idGenerator.next().value);

    const cleanedThemeColor = computed(function() {
      return toCleanRgb(props.themeColor) || toCleanRgb('foreground');
    });
    const cleanedToggleGroup = computed(function() {
      return props.toggleGroup?.toString?.() || '';
    });
    const themeContrastColor = computed(function() {
      return contrast(cleanedThemeColor.value, 2);
    });

    const contentResizeObserver = new ResizeObserver(function() {
      if(!opened.value) return;

      if(!content_ref.value) return;

      if(content_ref.value.offsetHeight) {
        contentSize.value = `${content_ref.value.offsetHeight}px`;
        recentContentSize.value = contentSize.value;
      }
      else contentSize.value = recentContentSize.value;
    });

    watch(function() {
      return opened.value;
    }, function(value) {
      if(value) {
        if(cleanedToggleGroup.value) emitter.emit(`w-accordion-${cleanedToggleGroup.value}:opened`, wid.value);

        if(content_ref.value?.offsetHeight) {
          contentSize.value = `${content_ref.value.offsetHeight}px`;
          recentContentSize.value = contentSize.value;
        }
        else contentSize.value = recentContentSize.value;
      }
      else contentSize.value = '0px';
    });

    watchEffect(function() {
      if(content_ref.value) contentResizeObserver.observe(content_ref.value, {box: 'border-box'});
      else contentResizeObserver.disconnect();
    });

    emitter.on(`w-accordion-${cleanedToggleGroup.value}:opened`, function(otherWid) {
      if(otherWid != wid.value && opened.value) opened.value = false;
    })

    return {
      cleanedThemeColor,
      content_ref,
      contentSize,
      opened,
      recentContentSize,
      themeContrastColor,
      wid
    };
  } 
}
</script>

<style lang="scss" scoped>
.w-accordion {
  --self__pointer-events: auto;
  --toggler__border-radius: 5px;
  --toggler--icon__transform: none;
  --content-container--separator__background-alpha: 0;

  &:where(.state\:opened) {
    --toggler__border-radius: 5px 5px 0px 0px;
    --toggler--icon__transform: rotateZ(180deg);
    --content-container--separator__background-alpha: 0.25;
  }
}
.w-accordion {
  padding: 0.5rem;
  pointer-events: none;
  width: 100%;

  & > * {
    pointer-events: var(--self__pointer-events);
  }
  & > .wrapper {
    background-color: rgba(var(--theme-color), 1);
    border-radius: 5px;
    box-shadow: 0px 0px 4px 1px rgba(var(--w-color-shadow), 0.1);
    width: 100%;

    & > .toggler {
      align-items: center;
      background-color: transparent;
      border: none;
      border-radius: var(--toggler__border-radius);
      cursor: pointer;
      display: flex;
      justify-content: center;
      padding: 0.85rem;
      text-align: left;
      transition-property: border-radius;
      width: 100%;

      & > .label {
        flex: 1 1 auto;
        padding-right: 0.85rem;
        width: 100%;
      }
      & > .icon {
        flex: 0 0 auto;
        transform: var(--toggler--icon__transform);
        transform-origin: center;
        transition-property: color, transform;
      }
    }
    & > .content-container {
      height: var(--content-size);
      position: relative;
      overflow: hidden;
      transition-property: height;

      & > .separator {
        background-color: rgba(var(--theme-contrast-color), var(--content-container--separator__background-alpha));
        height: 1px;
        left: 0.85rem;
        position: absolute;
        top: 0px;
        transition-property: background-color;
        width: calc(100% - 1.7rem);
      }
      & > .content {
        padding: 0.85rem;
      }
    }
  }
}
</style>