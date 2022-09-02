<script setup>
import { ref } from 'vue';
import Main from '@/components/Main.vue'
const quest = ref([
    { index: 1, value: '1', question: '<p>Perhatikan gambar di bawah ini!</p><p><br><img src="src/assets/fimojempol.png" alt="img soal 1.1" style="height: 10vw" /></p><p>Sebuah lingkaran menyinggung keempat sisi suatu layang-layang. Jika panjang dua sisi layang-layang adalah 30 cm dan 40 cm dan keduanya saling tegak lurus, maka luas lingkaran dalam layang-layang adalah .... <span class="ql-formula" data-value="(\pi=\frac{22}{7})"><span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mi>π</mi><mo>=</mo><mfrac><mn>22</mn><mn>7</mn></mfrac><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">(\pi=\frac{22}{7})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right: 0.0359em;">π</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 1.1901em; vertical-align: -0.345em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.8451em;"><span class="" style="top: -2.655em;"><span class="pstrut" style="height: 3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">7</span></span></span></span><span class="" style="top: -3.23em;"><span class="pstrut" style="height: 3em;"></span><span class="frac-line" style="border-bottom-width: 0.04em;"></span></span><span class="" style="top: -3.394em;"><span class="pstrut" style="height: 3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">22</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height: 0.345em;"><span class=""></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose">)</span></span></span></span></span></span></p>', score: 30, bg: '--light', border: '--primary', font: '--primary' },
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
    { index: 17, value: '17', question: '<p>Abcdefghijklmnopqr</p>', score: 40, bg: '--light', border: '--primary', font: '--primary' },
    { index: 18, value: '18', question: '<p>Abcdefghijklmnopqrs</p>', score: 50, bg: '--light', border: '--primary', font: '--primary' },
    { index: 19, value: '19', question: '<p>Abcdefghijklmnopqrst</p>', score: 30, bg: '--light', border: '--primary', font: '--primary' },
    { index: 20, value: '20', question: '<p>Abcdefghijklmnopqrstu</p>', score: 40, bg: '--light', border: '--primary', font: '--primary' },
    { index: 21, value: '21', question: '<p>Abcdefghijklmnopqrstuv</p>', score: 50, bg: '--light', border: '--primary', font: '--primary' },
    { index: 22, value: '22', question: '<p>Abcdefghijklmnopqrstuvw</p>', score: 30, bg: '--light', border: '--primary', font: '--primary' },
    { index: 23, value: '23', question: '<p>Abcdefghijklmnopqrstuvwx</p>', score: 40, bg: '--light', border: '--primary', font: '--primary' },
    { index: 24, value: '24', question: '<p>Abcdefghijklmnopqrstuvwxy</p>', score: 50, bg: '--light', border: '--primary', font: '--primary' },
    { index: 25, value: '25', question: '<p>Abcdefghijklmnopqrstuvwxyz</p>', score: 30, bg: '--light', border: '--primary', font: '--primary' },
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
    <Main :quests="quest" :contestants="contestants" :bonus="20" :count-down="120" :minscore="5" :vioscore="10" />
</template>