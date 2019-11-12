<template>
    <div>
        <transition class="test" name="slide-fade">
            <router-view class="aside"></router-view>
        </transition>
        <div class="subdesc_wrap">
            <Title :count="itemList.length">나의 구독리스트</Title>
            <v-btn class="add" @click="showRecommend" color="pink" flat small>추천받기</v-btn>

            <v-flex class="list-wrap" xs12 >
                <v-btn @click="showMyPOI" class="myBtn" tile outline block flat :color="isActive()">
                    <v-icon left>mdi-pencil</v-icon> 내 장소 보기/구독장소 표시
                </v-btn>

                <div v-if="itemList.length > 0">
                    <div :key="`item-${i.friendCmn}`" v-for="i in itemList">
                        <ListBasic
                                v-bind="i"
                                :characterId="setCharacterImg(i.characterId)"
                                @remove="remove"
                                @handleCheck="handleCheck"
                                @imgClick="imgClick"
                                :label="i.recommendIntro"
                        />
                    </div>
                </div>
                <Nodata v-else msg="구독 중인 멤버 없음" />
            </v-flex>
        </div>

        <transition name="fade">
            <div class="reload" v-if="btnFlag">
                <v-btn  color="blue lighten-1"
                        class="white--text"
                        @click="handleClick"
                >
                    현재위치 새로고침
                    <v-icon right dark>refresh</v-icon>
                </v-btn>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import { mapState } from 'vuex'
    import { RootState } from '@/ts.interface/store.ts'
    import { TempStoreValue } from '@/ts.interface/components.ts'
    import { TsGetSubScription } from '@/ts.interface/response/subscription.ts'
    import { TsGetMyPoi } from '@/ts.interface/response/main.ts'

    import Nodata from '@/components/Nodata.vue';
    import ListBasic from '@/components/ListBasic.vue';
    import Title from '@/components/Title.vue';
    import Wish from '@/container/Wish.vue';

    @Component({
        extends: Wish,
        components: { ListBasic, Nodata, Title },
        computed: {
            ...mapState({
	            characters: (state: RootState) => state.characters,
	            isLoading: (state: RootState) => state.isLoading,
                myCollections: (state: RootState) => state.myCollections,
	            recList: (state: RootState) => state.map.recommend, // 추천멤버리스트
	            itemList: (state: RootState) => state.map.subdescMember, // 구독리스트
            }),
        },
    })

    export default class Subdescript extends Vue<RootState>  {
	    public characters?: RootState['characters'];
	    public poiStore: TempStoreValue; // mapLayer 임시 ID저장
	    public move: void;
    	private flag: boolean = false;
    	private btnFlag: boolean = false; // 새로고침 버튼 Flag
	    private myActive: boolean = true; // 내위치 활성화&비활성화
	    private checked: string[] = []; // 체크박스 값 저장
	    private timer: any; // 새로고침버튼 Timer
	    @Watch('$route')
	    public routeUpdate() {
		    const { params } = this.$route;

		    if (params && params.key === 'reload') {
			    this.init();
		    }
	    }
        public async init() {
        	// historyback 이동시 중첩된 라우터라 2번 실행되어 다음과 같이 처리
	        if (this.$route.name === 'userdetail' || this.$route.name === 'recommend') {
		        this.$router.push({ name: 'subdescript' })
		        return;
	        }
	        // 이벤트 설정 후 서버값이 변경되기전에 init이 실행되어서
	        // 동기화가 맞지 않는 부분이 발생하여 init 텀을 줌

            const { lat, lng } = this.$mapbox.maps.getCenter();
            const params = {
                gpsLat: lat,
                gpsLon: lng,
                level: 13,
                radius: 1000,
            };
            this.layerReset();

            // 구독리스트 가져오기
            const friends = await this.$run('map/GET_SUBSCRIPT').then((res: TsGetSubScription) => {
                // 즐겨찾기 멤버 배열 cmn
                const friendStr: string[] = res.interestList.map((i) => {
                    return i.friendCmn
                });

                this.flag = true;
                return friendStr.join(',');
            });

            const friendsLayer = await this.$run('map/GET_MYPLACE', {
                ...params,
                type: 'FRIENDS',
                interestCmns: friends,
            }).then((res: TsGetMyPoi) => res)
            await this.drawMyPlace('FRIENDS', friendsLayer)

            // MY 가고싶어요
	        const myWishLayers = await this.$run('map/GET_MYPLACE', { ...params, type: 'MYWISH' }).then((res: TsGetMyPoi) => res);
            await this.drawMyPlace('WISH', myWishLayers)

            // MY 갔다왔어요
	        const myReviewLayers = await this.$run('map/GET_MYPLACE', { ...params, type: 'MYCHECK' }).then((res: TsGetMyPoi) => res);
            await this.drawMyPlace('REVIEWS', myReviewLayers)

            // 새로고침 버튼
            await this.$mapbox.maps.on('dragend', this.dragHandleEvent);
            await this.$run('SUCCESS')
        }

        // 새로고침 버튼 이벤트2
        public dragHandleEvent() {
	        this.btnFlag = true;

	        if (this.timer) {
		        clearTimeout(this.timer);
	        }

	        this.timer = setTimeout(() => {
		        this.btnFlag = false
	        }, 3000)
        }

        public created() {
        	setTimeout(() => {
		        this.init();
            }, 300)
        }

        public showRecommend() {
            this.$router.push({ path: 'subdescript/recommend' })
        }

	    private setCharacterImg(id: number) {
	    	if (this.characters) {
			    return this.characters[id].faceColor
            }
	    }
	    // 회원상세보기
	    private imgClick(cmn: string) {
		    this.$router.push({
			    name: 'userdetail',
			    params: { cmn },
		    })
	    }
	    // 내장소표시/끄기
	    private showMyPOI() {
		    this.myActive = !this.myActive;

		    this.poiStore.REVIEWS.map((v: string) => {
			    this.$mapbox.maps.setLayoutProperty(v, 'visibility', this.myActive ? 'visible' : 'none');
		    })

		    this.poiStore.WISH.map((v: string) => {
			    this.$mapbox.maps.setLayoutProperty(v, 'visibility', this.myActive ? 'visible' : 'none');
		    })
	    }
	    private isActive() {
		    // 내 구독표시 class 설정
		    return this.myActive ? 'indigo lighten-2' : 'grey lighten-1'
	    }
	    private handleClick() {
		    this.init();
		    this.btnFlag = false;
	    }
	    // 컴포넌트 체크박스 옵져버
	    private handleCheck(v: { friendCmn: string; value: string; }) {
		    if (this.flag) {
			    const temp: string[] = [];
			    let str = '';

			    if (v.value === null) {
				    this.checked.map((i) => {
					    if (i !== v.friendCmn) {
						    temp.push(i)
					    }
				    });

				    this.checked = temp;
				    str = '해제';
			    } else {
				    this.checked.push(v.friendCmn);
				    str = '설정'
			    }

			    this.$axios.setSubscript({
				    friendCmn: v.friendCmn,
				    isInterest: str === '설정' ? 'Y' : 'N',
			    }).then(() => {
				    this.init();
			    });

			    this.$store.dispatch('ALERT', {
				    color: 'warning',
				    icon: 'check_circle',
				    msg: `즐겨찾기가 ${str} 되었습니다.`,
			    });

		    } else {
			    this.checked.push(v.friendCmn);
		    }
	    }
	    // 구독취소
	    private remove(key: string) {
		    this.$axios.deleteSubscript(key);
		    this.$store.dispatch('ALERT', {
			    icon: 'check_circle',
			    msg: `구독 취소 되었습니다.`,
		    });
		    this.checked = [];
		    this.init();
	    }

	    // 내구독 레이어 표시
	    private async drawMyPlace(key: string, res: TsGetMyPoi[]) {
		    // 구성품만들기
		    const geoJson = await this.$mapbox.createFeature({
			    prefix: key,
			    content: res,
		    });

		    // 구독리스트 표식 이미지는 동일
		    if (key === 'FRIENDS') {
			    const data = this.$mapbox.getLayer();

			    data.layout['icon-size'] = 0.7;
			    data.layout['icon-image'] = 'seoul_base';
			    data.id = 'FRIENDS';
			    data.source = geoJson
			    // 레이어그리기
			    await this.$mapbox.maps.addLayer(data);
			    await this.$mapbox.maps.on('click', data.id, this.move);
		    } else {
			    // 레이어만들기
			    await this.$mapbox.createLayer(geoJson, (layer: any) => {
				    layer.layout['icon-size'] = 0.3;
			    })
		    }

		    this.poiStore[key] = await res.map((item: any) => {
			    const ID = `${key}_${item.poiId}`;

			    if (key !== 'FRIENDS') {
				    this.$mapbox.maps.on('click', ID, this.move);
			    }

			    return ID
		    });
		    // 스토어에 저장 > 추천받기에서 공유해야 함으로
		    await this.$store.commit('MY_COLLECTIONS', this.poiStore)
	    }

	    // overwrite
	    private layerReset() {
		    this.myActive = true;

		    for (const key in this.poiStore) {
			    if (key !== 'FRIENDS') {
				    this.poiStore[key].forEach((item: string) => {
					    this.$mapbox.clearMapLayer(item)
					    this.$mapbox.maps.off('dragend', item, this.dragHandleEvent)
				    })
			    } else {
				    this.$mapbox.clearMapLayer('FRIENDS')
			    }
		    }
	    }
    }
</script>

<style lang="scss" scoped>
    .aside{
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 16px;
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        background-color: white;
        z-index: 10;
    }
    /* 타이밍 기능을 사용할 수 있습니다. */
    .slide-fade-enter-active {
        transition: all .6s ease;
    }
    .slide-fade-leave-active {
        transition: all .6s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(-300px);
    }

    .subdesc_wrap{
        position: relative;
        .add{
            position: absolute;
            right: -25px;
            top: 10px;
        }
    }

    // 현재위치 새로고침
    .reload{
        position: fixed;
        left: 50%;
        top: 136px;
        margin-left: -90px;
        z-index: 100;
        .white--text{
            opacity: 0.8;
            font-size: 13px;
        }
        .v-icon--right{
            margin-left: 8px;
            font-size: 19px;
            position: relative;
            top: 1px;
        }
        &.fade-enter-active,
        &.fade-leave-active {
            transition: opacity .5s;
        }
        &.fade-enter,
        &.fade-leave-to {
            opacity: 0;
        }
    }
</style>