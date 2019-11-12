<template>
    <div>
        <div class="board-wrap">
            <div class="board-list" v-for="list in boarderList.content" :key="`${$route.params.name}${list.id}`" @click="goDetail(list.id)">
                <span class="category" v-if="list.headTitle">{{ list.headTitle }}</span>
                <span class="category">{{ list.category }}</span>
                <span class="tlt">{{ list.title }}</span>
                <span class="date">{{ list.createDate }}</span>
            </div>
        </div>
        <div class="text-xs-center">
            <v-pagination
                    color="pink lighten-1"
                    v-model="paging"
                    :length="boarderList.totalPages"
                    :total-visible="20"
            ></v-pagination>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

    interface ItemType {
	    headTitle?: string;
	    title: string;
	    createDate: string;
	    isImportant: string;
	    viewCount: number;
	    category: string;
	    id: number;
    }

    interface ResponseType {
	    content: ItemType [];
	    totalPages: number;
    }

    @Component({})
    export default class BoardList extends Vue {
	    public boarderList: ResponseType = {
		    content: [],
		    totalPages: 1,
	    }

	    @Prop() public boardName: string;
	    @Watch('$route', { immediate: true, deep: true })

        public routeUpdate() {
		    this.getBoardList()
	    }

        // PageBtn
        get paging() {
            return Number(this.$route.query.page) || 1
        }
        set paging(val: any) {
	        const data = {
		        name: this.$route.name,
		        query: {
			        id: 'page',
			        value: val,
                },
	        };

            this.$router.push(data)
        }

        private getBoardList(): void {
            const data = {
                boardName: this.boardName,
                osType: 'ANDROID',
            }

            this.$run('map/GET_BOARD_LIST', data).then((res: any) => {
	            const temp = res.content.map((i: any) => {
            		const { headTitle, title, createDate, category, isImportant, viewCount, noticeId, faqId } = i;
            		let id = 0;

                    if (noticeId) {
	                    id = noticeId
                    } else {
                    	id = faqId
                    }

            		return { headTitle, title, createDate, category, isImportant, viewCount, id }
            	})

                this.boarderList = {
	            	content: temp,
	                totalPages: res.totalPages,
                }
            })
        }

	    private goDetail(id: number): void {
	    	const routeParams = {
	    		name: 'boardDetail',
                params: {
	    			id: String(id),
	    		},
	    	}

            this.$router.push(routeParams)
        }

	    private created() {
		    this.getBoardList()
	    }
    }
</script>

<style lang="scss">
    $module: 'board';
    .#{$module} {
        &-wrap {
            margin-bottom: 20px;
        }
        &-list {
            padding: 10px 0;
            border-bottom: 1px solid #e7e9ef;
            cursor: pointer;
            .category {
                display: block;
                color: #ee6688;
                font-size: 14px;
            }
            .tlt {
                display: block;
                padding: 2px 0;
                font-size: 16px;
                color: #000;
            }
            .date {
                font-size: 13px;
                color: #babfcb;
            }
        }
    }
    .text-xs-center {
        margin-bottom: 20px;
    }
</style>