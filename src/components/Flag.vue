<template>
    <span class="flag-wrap">
        <span @click="clickHeart(uniqq)" class="ico"><v-icon>mdi-file-document-box-outline</v-icon>{{ review }}</span>
        <span @click="clickFlag(uniqq)" class="ico"><v-icon>mdi-flag-variant-outline</v-icon>{{ wish }}</span>
    </span>
</template>


<script>
    export default {
        name: 'Flag',
        props: {
            review: {
                type: Number,
                default: 0,
            },
            wish: {
                type: Number,
                default: 0,
            },
            uniqq: {
                type: String,
                default: '0',
            },
        },
        methods: {
            clickHeart(f) {
                this.$emit('clickHeart', f);
            },
            clickFlag(f) {
                this.$emit('clickFlag', f);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .v-icon{
        vertical-align: middle;
    }

</style>