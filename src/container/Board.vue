<template>
    <div>
        <Title>{{ boardName }}</Title>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { mapState } from 'vuex'
    import { rootState } from '@/ts.interface/store.ts'
    import BoardList from '@/components/BoardList'
    import Title from "@/components/Title";

    @Component({
        components: {
            BoardList, Title
        },
        computed: {
            ...mapState({
                isAlert: (state: rootState) => state.isAlert,
                isLoading: (state: rootState) => state.isLoading,
            }),
            boardName() {
                return this.$route.params.name === 'notice' ? '공지사항' : '도움말'
            },
        },
    })
    export default class Board extends Vue {}
</script>

<style lang="scss">
    .text-xs-center {
        margin: 20px -20px;
        .theme--light.v-pagination .v-pagination__item {
            min-width: 25px;
            font-size: 12px;
            padding: 0;
            margin: 0 3px;
        }
    }
</style>