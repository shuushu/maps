<template>
    <div>
        <Title :count="itemList.content.length">갔다왔어요 목록</Title>
        <div data-app>
            <v-select
                    v-model="sort"
                    :items="optlist"
                    label="정렬 보기"

            ></v-select>
        </div>
        <div class="review-list-wrap">
            <div v-if="itemList.content.length > 0">
                <ListCardHor  v-for="(item, index) in review" :key="`${item.poiId}_${index}`" v-bind="item">
                    <span class="history">[{{ item.history }}]</span>
                    <span>{{ item.content }}</span>
                    <div class="pink--text text--lighten-3" v-if="item.like > 0">{{ item.like }}명이 좋아합니다.</div>
                    <div class="btn-wrap">
                        <!--이동-->
                        <v-btn  class="move" flat icon color="pink" @click="move(item)">
                            <v-icon>mdi-arrow-decision-outline</v-icon>
                        </v-btn>
                        <!--삭제-->
                        <v-btn v-if="!$route.query.key" class="delete" flat icon color="indigo lighten-2" @click="remove(item)">
                            <v-icon>mdi-close-circle-outline</v-icon>
                        </v-btn>
                    </div>
                </ListCardHor>

                <div class="text-xs-center">
                    <v-pagination
                            color="pink lighten-1"
                            v-model="paging"
                            :length="itemList.total"
                            :total-visible="6"
                    ></v-pagination>
                </div>
            </div>
            <Nodata v-else msg="가고싶어요 목록이 없습니다." />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator"
    import { mapState } from 'vuex'
    import { rootState } from '@/ts.interface/store.ts'

    import ListCardHor from "@/components/ListCardHor"
    import Nodata from '@/components/Nodata'
    import Title from "@/components/Title";
    import Wish from "./Wish";


    @Component({
        extends: Wish,
        components: { ListCardHor, Nodata, Title },
        computed: {
            ...mapState({
                itemList: (state: rootState) => state.map.reviewList,
            }),

	        review() {
		        return this.itemList.content.map(i => {
		        	let { navWgs84Lat, navWgs84Lon } = i;
		        	let { displayName, categoryDisplayName, newAddress } = i.poi;
			        return {
				        poiId: i.poiId,
				        reviewAverageCode: i.pointCode,
				        reviewAverageName: i.pointCodeName,
				        content: i.content,
				        history: i.elapsedTimeString,
                        like: i.likeCount,
				        displayName,
				        navWgs84Lon,
				        navWgs84Lat,
				        categoryDisplayName,
				        newAddress,
			        }
		        })
	        }
        }
    })
    export default class ReviewList extends Vue {

    }
</script>

<style lang="scss">
.review-list-wrap{
    .history{
        font-size: 11px;
        vertical-align: middle;
        color: #666;
        display: inline-block;
        margin-right: 3px;
    }
    .pink--text{
        font-size: 11px;
    }
    .btn-wrap{
        position: absolute;
        right: 10px;
        bottom: 10px;
        text-align: right;
        .v-btn{
            margin: 0;
        }
    }
}
</style>