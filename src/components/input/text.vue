<template>
  <div
    class="w-input-text"
    :class="[
      {
        'state:focused': focused,
        'state:has-value': !!modelValue
      }
    ]"
    :style="{
      '--background-color': cleanedBackgroundColor,
      '--border-color': cleanedBorderColor,
      '--label-color': cleanedLabelColor,
      '--placeholder-color': cleanedPlaceholderColor,
      '--text-color': cleanedTextColor,
      '--theme-color': cleanedThemeColor,
      '--validation-color': validationColor,
      '--validation-contrast-color': validationContrastColor,
    }"
    v-bind="baseAttrs"
  >
    <Transition name="content-transition">
      <div
        class="label"
        @click="$refs.input_ref.focus();"
        v-if="label"
        v-text="label"
      ></div>
    </Transition>
    <div class="input-content-wrapper">
      <input
        class="input"
        ref="input_ref"
        :type="type"
        :value="modelValue"
        @blur="focused = false;"
        @focus="focused = true;"
        @input="$emit('update:modelValue', $event.target.value);"
        v-bind="otherAttrs"
      >
      <Transition name="content-transition">
        <div
          class="placeholder"
          v-if="placeholder"
          v-text="placeholder"
        ></div>
      </Transition>
      <Transition name="content-transition">
        <div
          class="border"
          v-if="!borderless"
        ></div>
      </Transition>
    </div>
    <Transition name="content-transition">
      <div
        class="validation-message"
        v-if="cleanedValidation"
      >
        <div
          class="content"
          v-scrollbar-directive:y="{color: validationColor}"
        >
          <slot name="validation-message"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { computed, onDeactivated, ref } from 'vue';
import ScrollbarDirective from '@/directives/scrollbar';
import { contrast, toCleanRgb } from '@/services/color';

export default {
  directives: {ScrollbarDirective},
  inheritAttrs: false,
  name: 'WInputText',
  props: {
    backgroundColor: {
      required: false,
      type: String
    },
    borderColor: {
      required: false,
      type: String
    },
    borderless: {
      required: false,
      type: Boolean
    },
    label: {
      required: false,
      type: String
    },
    labelColor: {
      required: false,
      type: String
    },
    modelValue: null,
    password: {
      required: false,
      type: Boolean
    },
    placeholder: {
      required: false,
      type: String
    },
    placeholderColor: {
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
    },
    validation: {
      required: false,
      type: String
    }
  },
  setup(props, context) {
    const focused = ref(false);

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
    const cleanedBackgroundColor = computed(function() {
      return toCleanRgb(props.backgroundColor) || toCleanRgb('background');
    });
    const cleanedBorderColor = computed(function() {
      return toCleanRgb(props.borderColor) || cleanedTextColor.value;
    });
    const cleanedLabelColor = computed(function() {
      return toCleanRgb(props.labelColor) || cleanedTextColor.value;
    });
    const cleanedPlaceholderColor = computed(function() {
      return toCleanRgb(props.placeholderColor) || cleanedTextColor.value;
    });
    const cleanedTextColor = computed(function() {
      return toCleanRgb(props.textColor) || contrast(cleanedBackgroundColor.value);
    });
    const cleanedThemeColor = computed(function() {
      return toCleanRgb(props.themeColor) || toCleanRgb('primary');
    });
    const cleanedValidation = computed(function() {
      const valid = [
        'danger',
        'info',
        'success',
        'warning'
      ];

      return valid.includes(props.validation) ? props.validation : null;
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
    const type = computed(function() {
      return props.password ? 'password' : 'text';
    });
    const validationColor = computed(function() {
      return toCleanRgb(cleanedValidation.value);
    });
    const validationContrastColor = computed(function() {
      return contrast(validationColor.value, 2);
    });

    onDeactivated(function() {
      focused.value = false;
    });

    return {
      baseAttrs,
      cleanedBackgroundColor,
      cleanedBorderColor,
      cleanedLabelColor,
      cleanedPlaceholderColor,
      cleanedTextColor,
      cleanedThemeColor,
      cleanedValidation,
      focused,
      otherAttrs,
      type,
      validationColor,
      validationContrastColor
    };
  }
}
</script>

<style lang="scss" scoped>
.w-input-text {
  --self__pointer-events: auto;
  --label__color: var(--label-color);
  --input-content-wrapper--input__box-shadow: none;
  --input-content-wrapper--input__padding-bottom: 0.85rem;
  --input-content-wrapper--input__padding-top: 0.85rem;
  --input-content-wrapper--placeholder__alpha: 0.5;
  --input-content-wrapper--placeholder__color: var(--placeholder-color);
  --input-content-wrapper--placeholder__font-size: 0.9rem;
  --input-content-wrapper--placeholder__padding-bottom: 0.85rem;
  --input-content-wrapper--placeholder__padding-left: 0.75rem;
  --input-content-wrapper--placeholder__padding-top: 0.85rem;
  --input-content-wrapper--border__border-color: var(--border-color);

  &:where(.state\:focused) {
    --label__color: var(--theme-color);
    --input-content-wrapper--input__box-shadow: 0px 0px 7px 2px rgba(var(--theme-color), 0.35);
    --input-content-wrapper--placeholder__alpha: 1;
    --input-content-wrapper--placeholder__color: var(--theme-color);
    --input-content-wrapper--placeholder__padding-left: 1.25rem;
    --input-content-wrapper--border__border-color: var(--theme-color);
  }
  &:where(.state\:has-value) {
    --input-content-wrapper--input__padding-bottom : 0.3rem;
    --input-content-wrapper--input__padding-top: 1.4rem;
    --input-content-wrapper--placeholder__font-size: 0.75rem;
    --input-content-wrapper--placeholder__padding-bottom: 1.75rem;
    --input-content-wrapper--placeholder__padding-left: 0.75rem;
    --input-content-wrapper--placeholder__padding-top: 0.3rem;
  }
}
.w-input-text {
  display: inline-block;
  padding: 0.5rem;
  pointer-events: none;
  user-select: none;

  & > .label {
    color: rgba(var(--label__color), 1);
    cursor: default;
    font-weight: bold;
    max-width: min-content;
    padding: 0px 0.5rem;
    pointer-events: var(--self__pointer-events);
    position: relative;
    transition-property: color;
    width: 100%;
    z-index: 1;
  }

  & > .input-content-wrapper {
    position: relative;
    width: 100%;
    z-index: 2;

    & > .input {
      background-color: rgba(var(--background-color), 1);
      border: none;
      border-radius: 5px;
      box-shadow: var(--input-content-wrapper--input__box-shadow);
      color: rgba(var(--text-color), 1);
      font-size: 0.9rem;
      padding: 0.75rem;
      padding-bottom: var(--input-content-wrapper--input__padding-bottom);
      padding-top: var(--input-content-wrapper--input__padding-top);
      pointer-events: var(--self__pointer-events);
      position: relative;
      transition-property: background-color, box-shadow, color, padding;
      width: 100%;
      z-index: 1;
    }
    & > .placeholder {
      color: rgba(var(--input-content-wrapper--placeholder__color), var(--input-content-wrapper--placeholder__alpha));
      font-size: var(--input-content-wrapper--placeholder__font-size);
      left: 0px;
      overflow: hidden;
      padding: 0.75rem;
      padding-bottom: var(--input-content-wrapper--placeholder__padding-bottom);
      padding-left: var(--input-content-wrapper--placeholder__padding-left);
      padding-top: var(--input-content-wrapper--placeholder__padding-top);
      position: absolute;
      text-overflow: ellipsis;
      top: 0px;
      transition-property: color, font-size, padding;
      white-space: nowrap;
      width: 100%;
      z-index: 2;
    }
    & > .border {
      border: 1px solid rgba(var(--input-content-wrapper--border__border-color), 1);
      border-radius: 5px;
      height: 100%;
      left: 0px;
      position: absolute;
      top: 0px;
      transition-property: border;
      width: 100%;
      z-index: 3;
    }
  }

  & > .validation-message {
    position: relative;
    padding-top: 0.5rem;
    width: 100%;

    &::before {
      border: 0.5rem solid transparent;
      border-bottom-color: rgba(var(--validation-color), 1);
      content: "";
      left: calc(50% - 0.5rem);
      position: absolute;
      top: -0.5rem;
      transition-property: border;
    }
    & > .content {
      background-color: rgba(var(--validation-color), 0.15);
      border: 1px solid rgba(var(--validation-color), 1);
      border-radius: 5px;
      color: rgba(var(--validation-color), 1);
      font-size: 0.75rem;
      max-height: 5rem;
      padding: 0.5rem;
      pointer-events: var(--self__pointer-events);
      transition-property: background-color, border, color;
      width: 100%;
    }
  }
}
</style>