<template>
  <div
    id="w-core-layer-error"
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
            class="underfold"
            points="149.67 31 117.67 95 10.34 95 42.34 31 149.67 31"
          />
          <polygon
            class="overfold"
            points="245.67 223 138.34 223 42.34 31 149.67 31 245.67 223"
          />
          <polygon
            class="underfold"
            points="341.67 31 245.67 223 138.34 223 234.34 31 341.67 31"
          />
          <polygon
            class="overfold"
            points="437.67 223 330.34 223 234.34 31 341.67 31 437.67 223"
          />
          <polygon
            class="underfold"
            points="501.67 95 437.67 223 330.34 223 394.34 95 501.67 95"
          />
        </g>
      </svg>
    </div>
    <div class="text">
      Sorry! We seem to have encounted an error.
    </div>
    <div class="message">
      ERR_MESSAGE:
      &quot;<b v-text="$store.state.SYSTEM.errorMessage"/>&quot;
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { contrast } from '@/services/color';

export default {
  name: 'WCoreLayerError',
  setup() {
    const alterColor = computed(function() {
      return contrast('overlay');
    });

    return {alterColor};
  }
}
</script>

<style lang="scss" scoped>
#w-core-layer-error {
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
    width: 6rem;

    & > .logo > .fold-wrapper {
      & > .underfold {
        fill: rgba(var(--alter-color), 1);
        transition-property: fill;
      }
      & > .overfold {
        fill: rgba(var(--w-color-danger), 1);
        transition-property: fill;
      }
    }
  }
  & > .text {
    color: rgba(var(--w-color-danger), 1);
    padding: 1rem;
    text-align: center;
    transition-property: color;
  }
  & > .message {
    color: rgba(var(--w-color-danger), 1);
    padding: 0px 1rem;
    text-align: center;
    transition-property: color;
  }
}
</style>