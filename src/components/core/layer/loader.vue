<template>
  <div
    id="wabisque-core-layer-loader"
    :style="{'--alter-color': alterColor}"
  >
    <div class="logo-wrapper">
      <svg
        class="logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 254.3"
      >
        <g class="fold-wrapper">
          <polygon
            class="fold-1"
            points="149.67 31 117.67 95 10.34 95 42.34 31 149.67 31"
          />
          <polygon
            class="fold-2"
            points="245.67 223 138.34 223 42.34 31 149.67 31 245.67 223"
          />
          <polygon
            class="fold-3"
            points="341.67 31 245.67 223 138.34 223 234.34 31 341.67 31"
          />
          <polygon
            class="fold-4"
            points="437.67 223 330.34 223 234.34 31 341.67 31 437.67 223"
          />
          <polygon
            class="fold-5"
            points="501.67 95 437.67 223 330.34 223 394.34 95 501.67 95"
          />
        </g>
      </svg>
    </div>
    <div
      class="message"
      v-text="$store.state.SYSTEM.loaderMessage"
    />
  </div>
</template>

<script>
import { computed } from 'vue';
import { contrast } from '@/services/color';

export default {
  name: 'WabisqueCoreLayerLoader',
  setup() {
    const alterColor = computed(function() {
      return contrast('overlay');
    });

    return {alterColor};
  }
};
</script>

<style lang="scss" scoped>
#wabisque-core-layer-loader {
  align-items: center;
  background-color: rgba(var(--w-color-overlay), 1);
  display: flex;
  flex-direction: column;
  height: 100vh;
  left: 0px;
  justify-content: center;
  min-height: max-content;
  position: fixed;
  top: 0px;
  transition-property: background-color;
  width: 100%;
  z-index: 1;

  & > .logo-wrapper {
    animation-duration: 3600ms;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: logo-wrapper-animation;
    animation-timing-function: ease-out;
    transform-origin: center;
    width: 5rem;

    & > .logo > .fold-wrapper {
      & > .fold-1 {
        animation-duration: 3600ms;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: fold-1-animation;
        animation-timing-function: ease-out;
        fill: rgba(var(--alter-color), 1);
        transition-property: fill;
      }
      & > .fold-2 {
        animation-duration: 3600ms;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: fold-2-animation;
        animation-timing-function: ease-out;
        fill: rgba(var(--w-color-primary), 1);
        transition-property: fill;
      }
      & > .fold-3 {
        animation-duration: 3600ms;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: fold-3-animation;
        animation-timing-function: ease-out;
        fill: rgba(var(--alter-color), 1);
        transition-property: fill;
      }
      & > .fold-4 {
        animation-duration: 3600ms;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: fold-4-animation;
        animation-timing-function: ease-out;
        fill: rgba(var(--w-color-primary), 1);
        transition-property: fill;
      }
      & > .fold-5 {
        animation-duration: 3600ms;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: fold-5-animation;
        animation-timing-function: ease-out;
        fill: rgba(var(--alter-color), 1);
        transition-property: fill;
      }
    }
  }
  & > .message {
    color: rgba(var(--w-color-primary), 1);
    padding: 1rem;
    text-align: center;
    transition-property: color;
  }
}

@keyframes logo-wrapper-animation {
  75% {
    opacity: 1;
    transform: none;
  }
  87.5% {
    opacity: 0;
    transform: scale(1.1);
  }
  100% {
    opacity: 0;
    transform: scale(1.1);
  }
}
@keyframes fold-1-animation {
  0% {
    opacity: 0;
  }
  12.5% {
    opacity: 1;
  }
}
@keyframes fold-2-animation {
  0% {
    opacity: 0;
  }
  12.5% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
}
@keyframes fold-3-animation {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0;
  }
  37.5% {
    opacity: 1;
  }
}
@keyframes fold-4-animation {
  0% {
    opacity: 0;
  }
  37.5% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
@keyframes fold-5-animation {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  62.5% {
    opacity: 1;
  }
}
</style>