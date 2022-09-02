<script setup>
import { ref } from 'vue';
import Main from '@/components/Main.vue'
const quest = ref([
    { index: 1, value: '1', question: '<p>Ab</p>', score: 30, bg: '--light', border: '--primary', font: '--primary' },
    { index: 2, value: '2', question: '<p>Abc</p>', score: 40, bg: '--light', border: '--primary', font: '--primary' },
    { index: 3, value: '3', question: '<p>Abcd</p>', score: 50, bg: '--light', border: '--primary', font: '--primary' },
    { index: 4, value: '4', question: '<p>Abcde</p>', score: 30, bg: '--light', border: '--primary', font: '--primary' },
    { index: 5, value: '5', question: '<p>Abcdef</p>', score: 40, bg: '--light', border: '--primary', font: '--primary' },
    { index: 6, value: '6', question: '<p>Abcdefg</p>', score: 50, bg: '--light', border: '--primary', font: '--primary' },
    { index: 7, value: '7', question: '<p>Abcdefgh</p>', score: 30, bg: '--light', border: '--primary', font: '--primary' },
    { index: 8, value: '8', question: '<p>Abcdefghi</p>', score: 40, bg: '--light', border: '--primary', font: '--primary' },
    { index: 9, value: '9', question: '<p>Abcdefghij</p>', score: 50, bg: '--light', border: '--primary', font: '--primary' },
    { index: 10, value: '10', question: '<p>Abcdefghijk</p>', score: 30, bg: '--light', border: '--primary', font: '--primary' },
    { index: 11, value: '11', question: '<p>Abcdefghijkl</p>', score: 40, bg: '--light', border: '--primary', font: '--primary' },
    { index: 12, value: '12', question: '<p>Abcdefghijklm</p>', score: 50, bg: '--light', border: '--primary', font: '--primary' },
    { index: 13, value: '13', question: '<p>Abcdefghijklmn</p>', score: 30, bg: '--light', border: '--primary', font: '--primary' },
    { index: 14, value: '14', question: '<p>Abcdefghijklmno</p>', score: 40, bg: '--light', border: '--primary', font: '--primary' },
    { index: 15, value: '15', question: '<p>Abcdefghijklmnop</p>', score: 50, bg: '--light', border: '--primary', font: '--primary' },
    { index: 16, value: '16', question: '<p>Abcdefghijklmnopq</p>', score: 30, bg: '--light', border: '--primary', font: '--primary' },
])

const contestants = ref([
    { name: 'A', score: 100, color: '--red' },
    { name: 'B', score: 100, color: '--blue' },
    { name: 'C', score: 100, color: '--yellow' },
    { name: 'D', score: 100, color: '--green' },
    { name: 'E', score: 100, color: '--gray' },
    { name: 'F', score: 100, color: '--orange' },
]);

</script>

<template>
    <Main is="mcshs" :quests="quest" :contestants="contestants" :bonus="20" :count-down="120" :minscore="5"
        :vioscore="10" title="Mathematics Competition for Senior High School" />
</template>