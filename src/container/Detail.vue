<template>
    <div id="detailWrap" >
        <DetailPOI v-bind="detailInfoValue" />
        <PhotoReview v-bind="photoReviewValue" />
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import { mapState } from 'vuex'
    import { rootState } from '@/ts.interface/store.ts'
    import DetailPOI from '@/components/DetailPOI.vue'
    import { mapbox, saveLayerID } from '@/common/map.ts'
    import PhotoReview from "../components/PhotoReview";
    import ShowReviewState from "../components/ShowReviewState";


    @Component({
        components: {
	        ShowReviewState,
	        PhotoReview,
            DetailPOI,
        },
        computed: {
            ...mapState({
                wishList: (state: rootState) => state.map.wishList,
                isLoading: (state: rootState) => state.isLoading,
                detail: (state: rootState) => state.map.detail,
            }),

            detailInfoValue (){
            	let { displayName, categoryDisplayName, wishCount, newAddress, address, phoneNumber, activityMiniMsg, reviewAverage, moreDetail, distance } = this.detail.info

	            reviewAverage = this.getReviewAverageCode();
	            activityMiniMsg = this.getMiniMsg();
	            moreDetail = this.getMoreDetail();
	            distance = this.distance;

	            let reviewStateValue = this.reviewStateValue();
            	return {
		            displayName, categoryDisplayName, wishCount, newAddress, address, phoneNumber, activityMiniMsg, distance,
                    ...reviewAverage,
                    reviewStateValue: reviewStateValue
                }

            },

	        photoReviewValue() {
	            let { tags,photos,photoCount } = this.detail.summary;
	            return  { tags,photos,photoCount }
	        },
        },
        data() {
        	return {
        		distance: 0
        	}
        },
        methods: {
	        reviewStateValue() {
		        let { goodCount, greatCount, poorCount, reviewAverage, reviewCount, sosoCount } = this.detail.summary;

		        reviewAverage = this.getReviewAverageCode();

		        return { goodCount, greatCount, poorCount, ...reviewAverage, reviewCount, sosoCount }
	        },
	        getMoreDetail() {
		        if (this.detail.more) {
			        return this.detail.more.map(item => {
				        let codeName = item.codeName;
				        let attrValue = item.subAttr.map(s => {

					        if (s.attrCode === 'HOMEPAGE_URL') {
						        return `<a href="${s.attrValue}" target="_blank">${s.attrValue}</a>`
					        } else if(item.attrCode === 'ETC_GROUP_LABEL') { // 부가정보
						        return `<span class="coll">${s.codeName}</span>`
					        } else {
						        return s.attrValue
					        }

				        })
				        return {
					        codeName,
					        attrValue: attrValue.join('')
				        }
			        });
		        } else {
			        return false;
		        }
	        },
	        getMiniMsg () {
		        if (this.detail.info.activityMini) {
			        return this.detail.info.activityMini.activityMiniMsg
		        } else {
			        return null
		        }
	        },
        	getReviewAverageCode () {
		        let { reviewAverage } = this.detail.info;

		        if (reviewAverage) {
		        	return {
				        reviewAverageCode: reviewAverage.code,
				        reviewAverageName: reviewAverage.name,
				        reviewAveragePoint: reviewAverage.point
                    }
                } else {
		        	return null
                }
            },
	        dragEvent() {
		        // 가고싶어요 목록에서, 클릭시.
		        this.$router.go(-1);
		        this.$mapbox.maps.off('dragend', this.dragEvent);
            }
        },
        destroyed() {
	        this.$mapbox.maps.off('dragend', this.dragEvent);
	        this.$mapbox.clearMapLayer('pulsing-dot')
            if (this.$mapbox.marker) {
	            this.$mapbox.marker.remove();
            }
        },
        updated() {
	        const { lat, lon } = this.$route.params;

	        if (lat && lon) {
		        this.$mapbox.maps.addLayer({
			        "id": "pulsing-dot",
			        "type": "symbol",
			        "source": {
				        "type": "geojson",
				        "data": {
					        "type": "FeatureCollection",
					        "features": [{
						        "type": "Feature",
						        "geometry": {
							        "type": "Point",
							        "coordinates":  [lon, lat]
						        }
					        }]
				        }
			        },
			        "layout": {
				        "icon-image": "pulsing-dot",
				        'text-field': this.detail.info.displayName,
				        'text-size': 12,
				        'text-offset': [ 0, 3 ],
			        }
		        });



		        this.$mapbox.createMarker({
                    poi: [ lon, lat ],
                    icon: this.detail.info.stickerFile,
                    size: 60
                })
	        }

        },
        created() {

        }
    })
    export default class Detail extends Vue {
        @Watch('$route', { immediate: true, deep: true })
        public routeUpdate() {
	        const { poi, lat, lon, distance } = this.$route.params;

	        const poiRequest = {
		        poi,
		        params: {
			        gpsLat: lat || 37.55669444,
			        gpsLon: lon || 126.97586111,
		        },
	        };

	        this.$run('map/GET_DETAIL', poiRequest);
	        // overwrite distance data
	        this.distance = distance;
	        this.$mapbox.maps.on('dragend', this.dragEvent);
        }
    }
</script>

<style lang="scss">
    #detailWrap {
        > .item{
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            margin: 14px 0;
        }
        .coll::after{
            content: ',';
            margin-right: 5px;
        }
        .subAttr-list-cont .coll:last-child::after{
            display: none;
        }
    }
</style>