<script setup>
import { toRefs } from 'vue';
const props = defineProps({
    is: {
        type: String,
        default: 'text',
    },
    type: {
        type: String,
        default: 'button',
    },
    icon: {
        type: String,
        default: 'fa-solid fa-magnifying-glass',
    },
    color: {
        type: String,
        default: 'primary',
    },
    dismiss: {
        default: false
    },
    disabled: {
        default: false
    },
    round: {
        default: false
    },
    to: String,
    tabindex: {
        type: Number,
        required: false,
        default: 0,
    },
    name: String,
    id: String,
    disabled: {
        default: false,
    },
    value: [String, Boolean],
    modelValue: {
        default: []
    },
})
const { is, icon, type, color, dismiss, disabled, round, to } = toRefs(props);
</script>

<template>
    <div :id="is">
        <button v-if="is === 'text'" class="btn-text" :disabled="disabled" :to="to"
            :class="[color, { dismiss: dismiss, disabled: disabled === true ? true : false, nav: round }]" :type="type">
            <slot></slot>
        </button>
        <button v-if="is === 'logo'" class="btn-logo" type="button" :to="to">
            <i :class="[icon, { disabled: disabled === true ? true : false }]"></i>
        </button>
    </div>
</template>

<style scoped>
.btn-text {
    width: 100%;
    height: 100%;
    padding: calc(.4rem + .25vw);
    font-size: var(--card-title);
    font-weight: 700;
    color: var(--light);
    border: 2px solid;
    justify-content: center;
    transition: .5s;
    cursor: pointer;
    border-radius: .25rem;
}

.btn-logo {
    width: 2rem;
    height: 2rem;
    border: 2px solid var(--primary);
    border-radius: 50%;
    background-color: var(--blue-300);
    color: var(--primary);
    transition: all .5s;
    cursor: pointer;
}

.btn-logo:hover {
    border-color: var(--blue-600);
    box-shadow: 1px 0 5px var(--blue-500);
}

.btn-logo:active {
    filter: opacity(80%);
}

.nav {
    border-radius: .5rem;
}

.dismiss {
    background-color: transparent !important;
}

.disabled,
.disabled:hover,
.disabled:active {
    background-color: var(--gray-300) !important;
    color: var(--gray-400) !important;
    cursor: not-allowed !important;
    border: 2px solid var(--gray-400) !important;
}

.primary {
    background-color: var(--primary);
    border-color: var(--primary);
}

.primary.dismiss {
    color: var(--primary) !important;
}

.primary:hover {
    background-color: var(--blue-600);
}

.primary:focus {
    box-shadow: 0 0 0 3px var(--blue-400) inset;
    border-color: var(--blue-400);
}

.primary.dismiss:focus {
    box-shadow: 0 0 0 3px var(--primary) inset;
    border-color: var(--primary);
}

.primary.dismiss:hover {
    background-color: var(--blue-300) !important;
}

.primary:active {
    background-color: var(--primary);
}

.primary.dismiss:active {
    background-color: transparent !important;
}

.warning {
    background-color: var(--warning);
    border-color: var(--warning);
}

.warning.dismiss {
    color: var(--warning) !important;
}

.warning:hover {
    background-color: var(--yellow-600);
}

.warning:focus {
    box-shadow: 0 0 0 3px var(--yellow-400) inset;
    border-color: var(--yellow-400);
}

.warning.dismiss:focus {
    border-color: var(--warning);
    box-shadow: 0 0 0 3px var(--warning) inset;
}

.warning.dismiss:hover {
    background-color: var(--yellow-300) !important;
}

.warning:active {
    background-color: var(--warning);
}

.warning.dismiss:active {
    background-color: transparent !important;
}

.success {
    background-color: var(--success);
    border-color: var(--success);
}

.success.dismiss {
    color: var(--success) !important;
}

.success:hover {
    background-color: var(--green-600);
}

.success:focus {
    box-shadow: 0 0 0 3px var(--green-400) inset;
    border-color: var(--green-400);
}

.success.dismiss:focus {
    box-shadow: 0 0 0 3px var(--success) inset;
    border-color: var(--success);
}

.success.dismiss:hover {
    background-color: var(--green-300) !important;
}

.success:active {
    background-color: var(--success);
}

.success.dismiss:active {
    background-color: transparent !important;
}

.error {
    background-color: var(--error);
    border-color: var(--error);
}

.error.dismiss {
    color: var(--error) !important;
}

.error:hover {
    background-color: var(--red-600);
}

.error:focus {
    box-shadow: 0 0 0 3px var(--red-400) inset;
    border-color: var(--red-400);
}

.error.dismis:focus {
    box-shadow: 0 0 0 3px var(--error) inset;
    border-color: var(--error);
}

.error.dismiss:hover {
    background-color: var(--red-300) !important;
}

.error:active {
    background-color: var(--error);
}

.error.dismiss:active {
    background-color: transparent !important;
}
</style>