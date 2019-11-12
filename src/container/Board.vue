<template>
    <div>
        <Title>{{ boardName }}</Title>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { mapState } from 'vuex'
    import { RootState } from '@/ts.interface/store.ts'
    import BoardList from '@/components/BoardList.vue'
    import Title from '@/components/Title.vue'

    @Component({
        components: {
            BoardList, Title,
        },
        computed: {
            ...mapState({
                isAlert: (state: RootState) => state.isAlert,
                isLoading: (state: RootState) => state.isLoading,
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