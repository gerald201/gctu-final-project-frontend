<template>
  <span
    class="wabisque-icon"
    :class="[icon]"
  />
</template>

<script>
import { computed } from 'vue';
import { getIcon } from '@/services/icon';

export default {
  name: 'WabisqueIcon',
  props: {
    family: {
      default: '',
      type: String
    },
    name: {
      default: '',
      type: String
    }
  },
  setup(props) {
    const icon = computed(function() {
      return getIcon(props.name, props.family);
    });

    return {icon};
  }
}
</script>

<style lang="scss" scoped>
.wabisque-icon {
  display: inline-block;
}
</style>