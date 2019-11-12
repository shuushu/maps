<template>
    <h2 class="tit">
        <slot></slot>
        <span class="count" v-if="count > 0">{{ count }}</span>
    </h2>
</template>


<script>
    export default {
        name: 'Title',
        props: {
            tit: {
                type: String,
                default: 'Title Value',
            },
            count: {
                type: Number,
                default: 0,
            },
        },
    }
</script>


<style lang="scss" scoped>
.tit{
    padding: 20px 16px 10px 0;
    font-size: 16px;
    font-weight: normal;
}
</style>