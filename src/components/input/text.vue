<template>
  <div
    class="gn-input-text"
    :class="[
        {
            'state:focused': focused,
            'state:has-value': hasValue
        }
    ]"
    v-bind="elAttrs"
  >
      <div class="wrapper">
        <input
            class="input"
            :type="type"
            :value="modelValue"
            v-bind="inputAttrs"
            @blur="focused = false;"
            @focus="focused = true;"
            @input="$emit('update:modelValue', $event.target.value);"
        >
        <div
            class="label"
            v-text="label"
        ></div>
      </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue';

export default {
    inheritAttrs: false,
    name: 'GnInputText',
    props: {
        isPassword: {
            default: false,
            type: Boolean
        },
        label: {
            default: '',
            type: String
        },
        modelValue: {
            default: '',
            type: null
        }
    },
    setup(props, context) {
        const refs = reactive({
            focused: false
        });

        const elAttrs = computed(function() {
            const entries = Object.entries(context.attrs)
                .filter(function([key]) {
                    return ['class', 'style'].includes(key);
                });

            return Object.fromEntries(entries);
        });
        const hasValue = computed(function() {
            return !!props.modelValue.toString().length;
        });
        const inputAttrs = computed(function() {
            const entries = Object.entries(context.attrs)
                .filter(function([key]) {
                    return !['class', 'style'].includes(key);
                });

            return Object.fromEntries(entries);
        });
        const type = computed(function() {
            return props.isPassword ? 'password' : 'text';
        });

        return {
            ...toRefs(refs),
            elAttrs,
            hasValue,
            inputAttrs,
            type
        };
    }
}
</script>

<style lang="scss" scoped>
.gn-input-text {
    --self__pointer-events: auto;
    --wrapper--input__border-color: var(--gn-color-shadow);
    --wrapper----input__box-shadow: none;
    --wrapper--label__alpha: 1;
    --wrapper--label__color: var(--gn-color-shadow);
    --wrapper--label__font-size: 1rem;
    --wrapper--label__padding-bottom: 0.75rem;
    --wrapper--label__padding-top: 0.75rem;

    &:where(.state\:has-value) {
        --wrapper--label__font-size: 0.75rem;
        --wrapper--label__padding-bottom: 1.2rem;
        --wrapper--label__padding-top: 0.3rem;
    }
    &:where(.state\:focused) {
        --wrapper--input__border-color: var(--gn-color-primary);
        --wrapper----input__box-shadow: 0px 0px 2px 3px rgba(var(--gn-color-primary), 0.15);
        --wrapper--label__color: var(--gn-color-primary);
        --wrapper--label__font-size: 0.75rem;
        --wrapper--label__padding-bottom: 1.2rem;
        --wrapper--label__padding-top: 0.3rem;
    }
}
.gn-input-text {
    display: inline-block;
    padding: 0.5rem;
    pointer-events: none;

    & > .wrapper {
        position: relative;
        width: 100%;

        & > .input {
            border: 1px solid rgba(var(--wrapper--input__border-color), 1);
            border-radius: 5px;
            box-shadow: var(--wrapper----input__box-shadow);
            font-size: 1rem;
            outline: none;
            padding: 1.2rem 0.75rem 0.3rem;
            pointer-events: var(--self__pointer-events);
            position: relative;
            transition-duration: 120ms;
            transition-property: border, box-shadow, padding;
            transition-timing-function: ease-out;
            width: 100%;
            z-index: 1;
        }
        & > .label {
            color: rgba(var(--wrapper--label__color), var(--wrapper--label__alpha));
            font-size: var(--wrapper--label__font-size);
            height: 100%;
            left: 0px;
            padding: var(--wrapper--label__padding-top) 0.75rem var(--wrapper--label__padding-bottom);
            position: absolute;
            top: 0px;
            transition-duration: 120ms;
            transition-property: color, font-size, padding;
            transition-timing-function: ease-out;
            width: 100%;
            z-index: 2;
        }
    }
}
</style>