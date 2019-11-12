<template>
    <div>
        <h3 v-html="boardDetail.title"></h3>
        <div v-html="boardDetail.content"></div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component({})
    export default class BoardDetail extends Vue {
	    @Prop() public boardName: string;
	    @Prop() public detailId: string;

        public boardDetail: { title: string; content: string } = {
	        title: '',
	        content: '',
        }

        private getBoardDetail(): void {
            this.$run('map/GET_BOARD_DETAIL', {
	            boardName: this.boardName,
	            id: this.detailId,
            }).then((res: any) => {
            	this.boardDetail = res
            })
        }

	    private created() {
		    this.getBoardDetail()
	    }
    }
</script>

<style scoped>

</style>