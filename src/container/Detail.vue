<template>
    <div id="detailWrap" >
        <DetailPOI v-bind="detailInfoValue()" />
        <PhotoReview v-bind="photoReviewValue()" />
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import { mapState } from 'vuex'
    import { RootState } from '@/ts.interface/store.ts'
    import { PoiAttrSubDto } from '@/ts.interface/response/pois.ts'
    // components
    import DetailPOI from '@/components/DetailPOI.vue'
    import PhotoReview from '@/components/PhotoReview.vue';
    import ShowReviewState from '@/components/ShowReviewState.vue';

    @Component({
        components: {
	        ShowReviewState,
	        PhotoReview,
            DetailPOI,
        },
        computed: {
            ...mapState({
                isLoading: (state: RootState) => state.isLoading,
                detail: (state: RootState) => state.map.detail,
            }),
        },
    })
    export default class Detail extends Vue {
	    public detail: RootState['map']['detail'];
	    public distance: string = '';

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
	    public detailInfoValue() {
		    const { displayName, categoryDisplayName, wishCount, newAddress, address, phoneNumber } = this.detail.info
		    const reviewAverage = this.getReviewAverageCode();
		    const activityMiniMsg = this.getMiniMsg();
		    const distance = this.distance || '';
		    const moreDetail = this.getMoreDetail();
		    const reviewStateValue = this.reviewStateValue();

		    return {
			    displayName, categoryDisplayName, wishCount, newAddress, address, phoneNumber, activityMiniMsg, distance, moreDetail,
			    ...reviewAverage,
			    reviewStateValue,
		    }

	    }

	    public photoReviewValue() {
		    const { tags, photos, photoCount } = this.detail.summary;
		    return  { tags, photos, photoCount }
	    }
	    private reviewStateValue() {
		    const { goodCount, greatCount, poorCount, reviewCount, sosoCount } = this.detail.summary;
		    const reviewAverage = this.getReviewAverageCode();

		    return { goodCount, greatCount, poorCount, ...reviewAverage, reviewCount, sosoCount }
	    }
	    private getMoreDetail() {
		    if (this.detail.more) {
			    return this.detail.more.map((item) => {
				    const codeName = item.codeName;
				    const attrValue = item.subAttr.map((s: PoiAttrSubDto) => {
					    if (s.attrCode === 'HOMEPAGE_URL') {
						    return `<a href="${s.attrValue}" target="_blank">${s.attrValue}</a>`
					    } else if (item.attrCode === 'ETC_GROUP_LABEL') { // 부가정보
						    return `<span class="coll">${s.codeName}</span>`
					    } else {
						    return s.attrValue
					    }

				    })
				    return {
					    codeName,
					    attrValue: attrValue.join(''),
				    }
			    });
		    } else {
			    return []
		    }
	    }
	    private getMiniMsg() {
		    if (this.detail.info.activityMini) {
			    return this.detail.info.activityMini.activityMiniMsg
		    } else {
			    return null
		    }
	    }
	    private getReviewAverageCode() {
		    const { reviewAverage } = this.detail.info;

		    if (reviewAverage) {
			    return {
				    reviewAverageCode: reviewAverage.code,
				    reviewAverageName: reviewAverage.name,
				    reviewAveragePoint: reviewAverage.point,
			    }
		    } else {
			    return {}
		    }
	    }
	    private dragEvent() {
		    // 가고싶어요 목록에서, 클릭시.
		    this.$router.go(-1);
		    this.$mapbox.maps.off('dragend', this.dragEvent);
	    }

	    private destroyed() {
		    this.$mapbox.maps.off('dragend', this.dragEvent);
		    this.$mapbox.clearMapLayer('pulsing-dot')
		    if (this.$mapbox.marker) {
			    this.$mapbox.marker.remove();
		    }
	    }
	    private updated() {
		    const { lat, lon } = this.$route.params;

		    if (lat && lon) {
			    this.$mapbox.maps.addLayer({
				    id: 'pulsing-dot',
				    type: 'symbol',
				    source: {
					    type: 'geojson',
					    data: {
						    type: 'FeatureCollection',
						    features: [{
							    type: 'Feature',
							    geometry: {
								    type: 'Point',
								    coordinates:  [lon, lat],
							    },
						    }],
					    },
				    },
				    layout: {
					    'icon-image': 'pulsing-dot',
					    'text-field': this.detail.info.displayName,
					    'text-size': 12,
					    'text-offset': [ 0, 3 ],
				    },
			    });


			    this.$mapbox.createMarker({
				    poi: [ lon, lat ],
				    icon: this.detail.info.stickerFile,
				    size: 60,
			    })
		    }
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