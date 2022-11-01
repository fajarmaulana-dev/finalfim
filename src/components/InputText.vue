<script setup>
import { toRefs, onMounted } from 'vue';
import katex from 'katex';
const emit = defineEmits(['prependClick', 'appendClick', 'micClick', 'camClick', 'update:modelValue']);
const props = defineProps({
    prependCursor: {
        type: String,
        required: false,
        default: 'default',
    },
    appendCursor: {
        type: String,
        required: false,
        default: 'default',
    },
    is: {
        type: String,
        required: false,
        default: 'input-logo',
    },
    prependIcon: {
        type: String,
        required: false,
        default: '',
    },
    appendIcon: {
        type: String,
        required: false,
        default: '',
    },
    type: {
        type: String,
        required: false,
        default: 'text',
    },
    name: {
        type: String,
        required: false,
        default: '',
    },
    id: {
        type: String,
        required: false,
        default: '',
    },
    rows: {
        type: Number,
        required: false,
        default: 3,
    },
    placeholder: {
        type: String,
        required: false,
        default: '',
    },
    validation: {
        type: String,
        required: false,
        default: '',
    },
    labelTitle: {
        type: String,
        required: false,
        default: 'Deskripsi',
    },
    labelDetail: {
        type: String,
        required: false,
        default: 'Ketikkan deskripsi selengkap mungkin',
    },
    inputType: {
        type: String,
        required: false,
        default: 'input',
    },
    logoType: {
        type: String,
        required: false,
        default: 'default',
    },
    modelValue: String,
    labelStyle: {
        type: String,
        required: false,
        default: '',
    },
    boxStyle: {
        type: String,
        required: false,
        default: '',
    },
})
const { prependCursor, appendCursor, is, prependIcon, appendIcon, type, name, id, rows, placeholder, validation, labelTitle, labelDetail, inputType, logoType, modelValue, labelStyle, boxStyle } = toRefs(props);
onMounted(() => window.katex = katex);
</script>

<template>
    <section :class="is">
        <div v-if="is === 'input-logo'" :class="logoType">
            <div class="i-prepend">
                <i :class="prependIcon" :style="{ cursor: prependCursor }" @click="$emit('prependClick')"></i>
            </div>
            <input spellcheck="false" :id="id" :name="name" :type="type" :placeholder="placeholder" class="i-logo"
                :style="boxStyle" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                :class="logoType === 'search' ? 'search' : ''">
            <div class="i-append" :class="logoType === 'search' ? 'search' : ''">
                <i :class="appendIcon" :style="{ cursor: appendCursor }" @click="$emit('appendClick')"></i>
                <i v-if="logoType === 'search'" class="fa-solid fa-microphone" :style="{ cursor: appendCursor }"
                    @click="$emit('micClick')"></i>
                <i v-if="logoType === 'search'" class="fa-solid fa-camera" :style="{ cursor: appendCursor }"
                    @click="$emit('camClick')"></i>
            </div>
        </div>
        <div v-if="is === 'input-label'" :class="inputType">
            <div class="label" :style="labelStyle">
                <p style="font-weight: 700; font-size: var(--card-title);">{{ labelTitle }}</p>
                <p style="margin-top: .25rem; font-size: var(--card-detail);">{{ labelDetail }}</p>
            </div>
            <div v-if="inputType === 'input'">
                <input spellcheck="false" :id="id" :name="name" :type="type" :placeholder="placeholder" class="i-label"
                    :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
            </div>
            <div v-if="inputType === 'textarea'">
                <textarea spellcheck="false" :id="id" :name="name" :rows="rows" :placeholder="placeholder"
                    class="i-label" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                    style="height: 100% !important;"></textarea>
            </div>
        </div>
    </section>
</template>

<style scoped>
.label {
    width: 100%;
    padding: .5rem;
    border: none;
    color: var(--light);
    background-color: var(--primary);
    justify-content: center;
    text-align: center;
    border-radius: .25rem .25rem 0 0;
}

.i-label {
    width: 100%;
    height: 2rem;
    background-color: var(--light);
    -webkit-text-fill-color: var(--primary);
    border: 2px solid var(--primary);
    color: var(--primary);
    font-size: 1rem;
    padding: .5rem;
    outline: none;
    transition: background-color 9999s ease-in-out 0s;
    border-radius: 0 0 .25rem .25rem;
}

.input-logo {
    position: relative;
    margin-bottom: .5rem 0;
}

.i-logo {
    width: 100%;
    padding: .5rem 2.5rem;
    border: 1px solid var(--blue-500);
    outline: none;
    border-radius: .5rem;
    font-size: var(--card-title);
    color: var(--primary);
    background-color: var(--light);
    -webkit-text-fill-color: var(--primary);
    justify-content: center;
    transition: all .3s;
    transition: background-color 9999s ease-in-out 0s
}

.i-logo:hover {
    border-color: var(--blue-600);
}

.i-logo:focus {
    box-shadow: 0 0 3px 3px var(--blue-400);
}

.i-prepend,
.i-append {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--icon);
    color: var(--primary);
}

.i-append {
    right: 1rem;
}

.i-prepend {
    left: 1rem;
}

.i-logo.search {
    padding-right: 3.85rem !important;
}

.i-append.search {
    width: 3rem !important;
    justify-content: space-between !important;
    margin-right: .75rem;
}

i:hover {
    filter: brightness(80%);
}

i:active {
    filter: brightness(100%);
}
</style>