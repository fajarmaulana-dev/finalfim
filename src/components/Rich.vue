<script setup lang="ts">
import { toRefs } from 'vue';
import Spinner from './Spinner.vue';

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    saver: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
})

const { disabled, title, saver, loading } = toRefs(props)

</script>

<template>
    <div id="rich"
        class="!border-2 !rounded-t-md [&_.hrt]:rounded [&_button]:transition-all [&_button]:duration-500 [&_.pck>.ql-picker-label]:rounded [&_.pck>.ql-picker-label]:!border-none !border-sky-600 !bg-sky-600 hover:[&_.hrt]:!bg-sky-700 active:[&_.hrt]:!bg-sky-600 [&_.hrt>svg>.ql-stroke]:!stroke-slate-50 [&_.hrt.ql-active]:!bg-sky-700 [&_.hrt>svg>.ql-active]:!stroke-slate-50 [&_.hrt>svg>.ql-fill]:!fill-slate-50 [&_.hrt>svg>.ql-active]:!fill-slate-50 [&_.pck>.ql-picker-label]:!bg-sky-700">
        <span v-if="title.length > 0" class="ql-formats font-bold text-slate-50">
            {{ title }}
        </span>
        <span class="ql-formats">
            <button aria-label="bold" class="hrt ql-bold"></button>
            <button aria-label="italic" class="hrt ql-italic"></button>
            <button aria-label="underline" class="hrt ql-underline"></button>
            <button aria-label="strike" class="hrt ql-strike"></button>
        </span>
        <span class="ql-formats">
            <button aria-label="blockquote" class="hrt ql-blockquote"></button>
            <button aria-label="code-block" class="hrt ql-code-block"></button>
        </span>
        <span class="ql-formats">
            <button aria-label="h1" class="hrt ql-header" value="1"></button>
            <button aria-label="h2" class="hrt ql-header" value="2"></button>
        </span>
        <span class="ql-formats">
            <select
                class="ql-header pck [&>.ql-picker-label]:!text-slate-50 [&>.ql-picker-label>svg>.ql-stroke]:!stroke-slate-50">
                <option :value="1"></option>
                <option :value="2"></option>
                <option :value="3"></option>
                <option :value="4"></option>
                <option :value="5"></option>
                <option :value="6"></option>
                <option selected></option>
            </select>
        </span>
        <span class="ql-formats">
            <button aria-label="ordered" class="hrt ql-list" value="ordered"></button>
            <button aria-label="bullet" class="hrt ql-list" value="bullet"></button>
        </span>
        <span class="ql-formats">
            <button aria-label="sub" class="hrt ql-script" value="sub"></button>
            <button aria-label="super" class="hrt ql-script" value="super"></button>
        </span>
        <span class="ql-formats">
            <button aria-label="right" class="hrt ql-align" value="right"></button>
            <button aria-label="center" class="hrt ql-align" value="center"></button>
            <button aria-label="justify" class="hrt ql-align" value="justify"></button>
            <button aria-label="rtl" class="hrt ql-direction" value="rtl"></button>
            <button aria-label="min" class="hrt ql-indent" value="-1"></button>
            <button aria-label="plus" class="hrt ql-indent" value="+1"></button>
        </span>
        <span class="ql-formats">
            <select class="ql-color pck [&>.ql-picker-label>svg>.ql-stroke:not(.ql-color-label)]:!stroke-slate-50">
                <option value="#000000"></option>
                <option value="#e60000"></option>
                <option value="#ff9900"></option>
                <option value="#ffff00"></option>
                <option value="#008a00"></option>
                <option value="#0066cc" selected></option>
                <option value="#9933ff"></option>
                <option value="#ffffff"></option>
                <option value="#facccc"></option>
                <option value="#ffebcc"></option>
                <option value="#ffffcc"></option>
                <option value="#cce8cc"></option>
                <option value="#cce0f5"></option>
                <option value="#ebd6ff"></option>
                <option value="#bbbbbb"></option>
                <option value="#f06666"></option>
                <option value="#ffc266"></option>
                <option value="#ffff66"></option>
                <option value="#66b966"></option>
                <option value="#66a3e0"></option>
                <option value="#c285ff"></option>
                <option value="#888888"></option>
                <option value="#a10000"></option>
                <option value="#b26b00"></option>
                <option value="#b2b200"></option>
                <option value="#006100"></option>
                <option value="#0047b2"></option>
                <option value="#6b24b2"></option>
                <option value="#444444"></option>
                <option value="#5c0000"></option>
                <option value="#663d00"></option>
                <option value="#666600"></option>
                <option value="#003700"></option>
                <option value="#002966"></option>
                <option value="#3d1466"></option>
            </select>
        </span>
        <span class="ql-formats">
            <select class="ql-background pck [&>.ql-picker-label>svg>.ql-stroke]:!stroke-slate-50">
                <option value="#000000"></option>
                <option value="#e60000"></option>
                <option value="#ff9900"></option>
                <option value="#ffff00"></option>
                <option value="#008a00"></option>
                <option value="#0066cc"></option>
                <option value="#9933ff"></option>
                <option value="#ffffff" selected></option>
                <option value="#facccc"></option>
                <option value="#ffebcc"></option>
                <option value="#ffffcc"></option>
                <option value="#cce8cc"></option>
                <option value="#cce0f5"></option>
                <option value="#ebd6ff"></option>
                <option value="#bbbbbb"></option>
                <option value="#f06666"></option>
                <option value="#ffc266"></option>
                <option value="#ffff66"></option>
                <option value="#66b966"></option>
                <option value="#66a3e0"></option>
                <option value="#c285ff"></option>
                <option value="#888888"></option>
                <option value="#a10000"></option>
                <option value="#b26b00"></option>
                <option value="#b2b200"></option>
                <option value="#006100"></option>
                <option value="#0047b2"></option>
                <option value="#6b24b2"></option>
                <option value="#444444"></option>
                <option value="#5c0000"></option>
                <option value="#663d00"></option>
                <option value="#666600"></option>
                <option value="#003700"></option>
                <option value="#002966"></option>
                <option value="#3d1466"></option>
            </select>
        </span>
        <span class="ql-formats">
            <button aria-label="link" class="hrt ql-link"></button>
            <button aria-label="video" class="hrt ql-video"></button>
            <button aria-label="image" class="hrt ql-image"></button>
        </span>
        <span class="ql-formats">
            <button aria-label="formula" class="hrt ql-formula"></button>
            <button aria-label="saver" v-if="saver" :disabled="disabled || loading" style="transition: .4s;"
                class="rounded grid place-items-center text-sm cursor-pointer"
                :class="disabled || loading ? `!cursor-not-allowed hover:cursor-not-allowed active:cursor-not-allowed hover:!bg-sky-600 active:!bg-sky-600` : 'hover:!bg-sky-700 active:!bg-sky-800'"
                @click="$emit('save')">
                <Spinner v-if="loading" is="yin" fill="fill-white" :width="16" />
                <i v-else class="fa-solid fa-floppy-disk text-slate-50"
                    :class="disabled ? '!text-sky-900 hover:!text-sky-900 active:!text-sky-900' : ''"></i>
            </button>
            <button aria-label="cancel" v-if="saver" @click="$emit('cancel')"
                class="rounded duration-500 flex items-center cursor-pointer text-slate-50 text-sm font-bold hover:!bg-sky-700 active:!bg-sky-800"
                style="width: max-content; transition: background-color .5s;">
                Batal Edit
            </button>
        </span>
    </div>
</template>