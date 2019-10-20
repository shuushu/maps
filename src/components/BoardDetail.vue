<template>
    <div>
        <h3 v-html="boardDetail.title"></h3>
        <div v-html="boardDetail.content"></div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator"

    @Component({
        data() {
            return {
                boardDetail: {},
            }
        },
    })
    export default class BoardDetail extends Vue {
        @Prop() boardName: string
        @Prop() detailId: number

        getBoardDetail(): void {
            const data = {
                boardName: this.boardName,
                id: this.detailId,
            }
            this.$run('map/GET_BOARD_DETAIL', data)
                .then((res: any) => {
                    this.boardDetail = res
                }).catch(err => {
                console.log(err)
            })
        }

        constructor() {
            super()
            this.getBoardDetail()
        }
    }
</script>

<style scoped>

</style>