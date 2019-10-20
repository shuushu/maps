<template>
    <div>
        <div v-if="boardName === 'notice'">
            <div class="board-wrap">
                <div class="board-list" v-for="list in boardList.content" :key="list.noticeId" @click="goDetail(list.noticeId)">
                    <span class="category" v-if="list.headTitle">{{ list.headTitle }}</span>
                    <span class="tlt">{{ list.title }}</span>
                    <span class="date">{{ list.createDate }}</span>
                </div>
            </div>
            <div class="text-xs-center">
                <v-pagination
                        color="pink lighten-1"
                        v-model="paging"
                        :length="boardList.totalPages"
                        :total-visible="20"
                ></v-pagination>
            </div>
        </div>
        <div v-else-if="boardName === 'faq'">
            <div class="board-wrap">
                <div class="board-list" v-for="list in boardList.content" :key="list.faqId" @click="goDetail(list.faqId)">
                    <span class="category">{{ list.category }}</span>
                    <span class="tlt">{{ list.title }}</span>
                    <span class="date">{{ list.createDate }}</span>
                </div>
            </div>
            <div class="text-xs-center">
                <v-pagination
                        color="pink lighten-1"
                        v-model="paging"
                        :length="boardList.totalPages"
                        :total-visible="20"
                ></v-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator"

    @Component({
        data() {
            return {
                boardList: {},
            }
        },
        watch: {
            '$route' (to) {
                // 경로 변경에 반응하여...
                if (to.params.name) {
                    this.getBoardList()
                }
            },
        },
    })
    export default class BoardList extends Vue {
        // PageBtn
        get paging() {
            return Number(this.$route.query.page) || 1
        }
        set paging(val: any) {
            let params = this.setRouterParams({
                id: 'page',
                value: val
            });
            this.$router.push(params)
        }

        @Prop() boardName: string

        getBoardList(): void {
            const data = {
                boardName: this.boardName,
                osType: 'ANDROID'
            }
            this.$run('map/GET_BOARD_LIST', data)
                .then((res: any) => {
                    this.boardList = res
                }).catch(err => {
                console.log(err)
            })
        }

        goDetail(id: number): void {
            // console.log(id, this.$route.params)
            this.$router.push({name:'boarddetail', params: {id:id}})
        }

        constructor() {
            super()
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