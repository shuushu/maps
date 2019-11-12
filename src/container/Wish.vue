<template>
    <div>
        <Title :count="itemList.content.length">가고싶어요 목록</Title>
        <div data-app>
            <v-select
                    v-model="sort"
                    :items="optlist"
                    label="정렬 보기"

            ></v-select>
        </div>

        <div class="wish-wrap">
            <div v-if="itemList.content.length > 0">
                <ListCardHor v-for="item in itemList.content" :key="item.poiId"
                             v-bind="item"
                             :reviewAverageName="getAverageProps('name', item)"
                             :reviewAverageCode="getAverageProps('code', item)"
                >
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
                            :length="itemList.totalPages"
                            :total-visible="6"
                    ></v-pagination>
                </div>
            </div>
            <Nodata v-else msg="가고싶어요 목록이 없습니다." />
        </div>
    </div>

</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import { mapState } from 'vuex'
    import { RootState } from '@/ts.interface/store.ts'
    import { TempStoreValue } from '@/ts.interface/components.ts'
    import { TsGetWish } from '@/ts.interface/response/wish.ts'


    import Nodata from '@/components/Nodata.vue';
    import ListCardHor from '@/components/ListCardHor.vue';
    import Title from '@/components/Title.vue';

    // Register the router hooks with their names
    Component.registerHooks([
	    'beforeRouteEnter',
	    'beforeRouteLeave',
	    'beforeRouteUpdate',
    ])

    interface RouterDetailProps {
    	lat: number;
    	lon: number;
    	poi: number;
    	distance?: string;
    }

    @Component({
        components: { ListCardHor, Nodata, Title },
        computed: {
            ...mapState({
                itemList: (state: RootState) => state.map.wishList,
            }),
        },
        data() {
        	return {
		        poiStore: {},
            }
        },
    })

    export default class Wish extends Vue {
    	public itemList: RootState['map']['wishList']['content'];
        public optlist: string[] = ['이름순', '거리순', '날짜순'];
	    public poiStore: TempStoreValue; // mapLayer 임시 ID저장
	    @Watch('$route')
	    public routeUpdate() {
		    const { page, key, sort } = this.$route.query

		    if (page || key || sort) {
			    this.layerReset();
			    this.init()
		    }
	    }

	    public beforeRouteLeave(to: any, from: any, next: any) {
		    this.layerReset();
		    next();
	    }
	    public beforeRouteEnter(to: any, from: any, next: any) {
		    next((vm: any) => {
			    vm.checkRouter(from)
		    });
	    }

        // wish에 parameter가 존재할 경우
	    public setRouterParams(params: { id: string, value: any }) {
		    const data: { name: string; query: any } = {
			    name: this.$route.name,
                query: {},
		    };

		    // 다른유저의 가고싶어요
		    if (this.$route.query.key) {
			    data.query['key'] = this.$route.query.key
            }

            // pageing
		    if (this.$route.query.page) {
			    data.query['page'] = this.$route.query.page
            }

            // sort
		    if (this.$route.query.sort) {
			    data.query['sort'] = this.$route.query.sort
		    }

		    data.query[params.id] = params.value

		    return data
        }

        // PageBtn
        get paging() {
            return Number(this.$route.query.page) || 1
        }
        set paging(val: any) {
        	const params = this.setRouterParams({
                id: 'page',
		        value: val,
            });
        	this.layerReset();
	        this.$router.push(params)
        }

        get sort() {
            let temp: string = '';
            switch (this.$route.query.sort) {
                case 'DATE': temp = '날짜순';
                    break;

                case 'DISTANCE': temp = '거리순';
                    break;

                case 'NAME': temp = '이름순';
                    break;

            }

            return temp
        }
        set sort(str: string) {
	        if (this.itemList.content.length > 0) {
                let temp: string = '';

                switch (str) {
                    case '날짜순': temp = 'DATE';
                        break;

                    case '거리순': temp = 'DISTANCE';
                        break;

                    case '이름순': temp = 'NAME';
                        break;

                }

                const params = this.setRouterParams({
                    id: 'sort',
                    value: temp,
                });

                this.layerReset();
                this.$router.push(params)
	        }
        }
        // public async init(params?: false): Promise<void> {}

	    // router history check
	    public checkRouter(from: any) {
		    if (from.name === 'detail') {
			    this.$mapbox.maps.flyTo({ zoom: 14 });
		    }
	    }
	    public getAverageProps(type: string, data: TsGetWish) {
		    const average = data.reviewAverage

		    if (average) {
			    return average[type]
		    }
	    }
	    // 리스트 > 아이콘클릭
	    public move(data: any) {
		    const value: RouterDetailProps = {
		    	lat: 0,
                lon: 0,
                poi: 0,
            }

            let dv = '';

		    if (data.type === 'click') {
			    value.lat = data.features[0].geometry.coordinates[1];
			    value.lon = data.features[0].geometry.coordinates[0];
			    value.poi = data.features[0].properties.poi;

		    } else {
			    const { distance, poiId, navWgs84Lon, navWgs84Lat } = data;

			    value.lon = navWgs84Lon;
			    value.lat = navWgs84Lat;

			    value.poi = poiId;
			    dv = distance;
		    }

		    // 날아간다
		    this.$mapbox.maps.flyTo({
			    center: [ value.lon, value.lat ],
			    speed: 10,
			    zoom: 17,
		    });

		    // poi 상세 정보
		    this.$router.push({
			    name: 'detail',
			    params: {
				    lat: String(value.lat),
                    lon: String(value.lon),
                    poi: String(value.poi),
                    distance: dv,
                },
		    });
	    }
	    public remove(item: TsGetWish) {
		    const type = this.$route.name;
		    const poi = item.poiId;
		    let str = '';

		    if (type === 'wish') {
			    str = '가고싶어요'
		    } else {
			    str = '갔다왔어요';
		    }

		    this.$store.commit('SET_CONFIRM', {
			    title: `${str} 삭제`,
			    templet: `나의 ${str} 목록에서 <span style="color: indianred">"${item.displayName}"</span>을 정말 삭제하시겠습니까?`,
			    flag: true,
			    func: () => {
				    if (type === 'wish') {
					    this.$axios.deleteWish(poi).then(() => {
						    this.$store.dispatch('ALERT', {
							    color: 'warning',
							    icon: 'check_circle',
							    msg: `갔다왔어요 삭제 완료`,
						    });
						    this.layerReset();
						    this.init()
					    })
				    }
			    },
		    })
	    }

	    public layerReset() {
		    const keyValue = this.$route.name;
		    const name = keyValue.toLocaleUpperCase();

		    if (this.poiStore[name]) {
			    this.poiStore[name].forEach((ID: string) => {
				    this.$mapbox.clearMapLayer(ID)
				    this.$mapbox.maps.off('click', ID, this.move)
			    })
		    }
		    this.$mapbox.clearMapLayer('click')
	    }

	    public init() {
		    let key = this.$route.name;
		    const sortValue = this.$route.query.sort || 'DATE'
		    // 라우터 쿼리에 CMN값이 있을때 (타인의 가고싶어요)
		    const cmnKey = this.$route.query.key;
		    const params: any = {
			    gpsLat: 37.500084,
			    gpsLon: 127.003306,
			    page: Number(this.$route.query.page) || 1,
			    size: 10,
		    };

		    key = key.toLocaleUpperCase();

		    // 위시랑 리뷰 요청 파라미터가 달라서.. 왜다름.??
		    if (key === 'REVIEWS') {
			    params.sortType =  sortValue;
		    } else {
			    params.sort = sortValue
		    }


		    // url에 CMN값이 있을때
		    if (cmnKey) {
			    params.targetCmn = cmnKey;
		    }

		    this.$run(`map/GET_${key}`, params).then((res: any) => {
			    let params;
			    let temp: string;

			    if (key === 'REVIEWS') {
				    params = []
			    } else {
				    params = res.content;
			    }

			    // 컬렉션 저장~
			    this.poiStore[key] = [];
			    res.content.forEach((item: any) => {
				    let ID;

				    if (key === 'REVIEWS') {
					    ID = `${key}_${item.review.poiId}`
					    params.push(item.poi)
				    } else {
					    ID = `${key}_${item.poiId}`
				    }
				    // 중복이 있는건 제외
				    if (temp === ID) {
					    return false;
				    }

				    temp = ID
				    this.poiStore[key].push(ID)
				    this.$mapbox.maps.on('click', ID, this.move);
			    });


			    // 구성품만들기
			    const geoJson = this.$mapbox.createFeature({
				    prefix: key,
				    content: params,
			    });

			    // 레이어그리기
			    this.$mapbox.createLayer(geoJson, (layer: any) => {
				    layer.layout['icon-size'] = 0.3;
			    })
		    })
	    }
	    public created() {
		    if (this.$route.name !== 'subdescript') {
			    this.init();
		    }
	    }
    }
</script>

<style lang="scss">
.wish-wrap{
    // pagenation
    .text-xs-center{
        margin: 20px -20px;
        .theme--light.v-pagination .v-pagination__item{
            min-width: 25px;
            font-size: 12px;
            padding: 0;
            margin: 0 3px;
        }
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