<template>
    <div
        class="gn-button-action"
        v-bind="elAttrs"
    >
        <button
            class="button"
            v-bind="buttonAttrs"
        >
            <slot></slot>
        </button>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    inheritAttrs: false,
    name: 'GnButtonAction',
    setup(props, context) {
        const buttonAttrs = computed(function() {
            const entries = Object.entries(context.attrs)
                .filter(function([key]) {
                    return !['class', 'style'].includes(key);
                });

            return Object.fromEntries(entries);
        });
        const elAttrs = computed(function() {
            const entries = Object.entries(context.attrs)
                .filter(function([key]) {
                    return ['class', 'style'].includes(key);
                });

            return Object.fromEntries(entries);
        });

        return {
            buttonAttrs,
            elAttrs
        }
    }
}
</script>

<style lang="scss" scoped>
.gn-button-action {
    --self__pointer-events: auto;
    --button__filter: brightness(1);

    & > .button:where(:hover) {
        --button__filter: brightness(0.9);   
    }
}
.gn-button-action {
    display: inline-block;
    padding: 0.5rem;
    pointer-events: none;

    & > .button {
        background-color: rgba(var(--gn-color-secondary), 1);
        border: none;
        border-radius: 5px;
        color: rgba(var(--gn-color-bg), 1);
        filter: var(--button__filter);
        font-size: 1rem;
        padding: 0.75rem;
        pointer-events: var(--self__pointer-events);
        transition-duration: 120ms;
        transition-property: background-color, color, filter;
        transition-timing-function: ease-out;
        width: 100%;
    }
}
</style>