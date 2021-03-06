<template>
    <v-app>
    <div id="app">
        <div id="loading" v-if="isLoading">
            <v-progress-linear id="comp-progress" color="indigo" :indeterminate="isLoading"></v-progress-linear>
        </div>

        <div id="alertwrap">
            <v-alert id="alert" :value="isAlert.show" :color="isAlert.color" :icon="isAlert.icon" outline>
                {{ isAlert.msg }}
            </v-alert>
        </div>

        <Confirm
                @handlceConfirm="handlceConfirm"
                @handleCancel="handleCancel"
                v-bind="confirm"
        />

        <header>
            <div class="header" id="header">
                <router-link class="logo" to="/">어디가지또</router-link>
            </div>
        </header>
        <SideNav />
        <article id="contents">
            <div class="wrap">
                <router-view />
            </div>
            <div class="mapboxLoading" v-if="isLoading">
                <v-progress-circular :width="3" color="red" indeterminate></v-progress-circular>
                <p class="text">데이터 로딩중</p>
            </div>
        </article>


        <div id="mapwrap">
            <div id="map"></div>
        </div>
    </div>
    </v-app>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { mapActions, mapState } from 'vuex'
    import { RootState, TsCharacters } from '@/ts.interface/store.ts'
    import { MapAPI } from '@/common/map.ts'
    // components
    import Confirm from '@/components/Confirm.vue'
    import SideNav from '@/components/SideNav.vue';
    // 팝업 이벤트버스
    import bus from '@/service/axiosClient'
    // CSS
    import 'mapbox-gl/dist/mapbox-gl.css'

    interface ErrorState {
	    debug: string;
	    error: string;
	    errorCode: string;
	    message: string;
	    request: string;
	    timestamp: string;
    }

    @Component({
	    components: { SideNav, Confirm },
	    computed: {
            ...mapState({
                isAlert: (state: RootState) => state.isAlert,
                isLoading: (state: RootState) => state.isLoading,
	            confirm: (state: RootState) => state.confirm,

            }),
        },
        methods: {
            ...mapActions({
                alert: 'ALERT',
            }),
        },
    })
    export default class App extends Vue {
	    public confirm: RootState['confirm'];


	    public handlceConfirm() {
		    // 컨펌창 완료 시 팝업을 지우고, 레이어도 지운다.
		    this.confirm.func()
		    this.handleCancel()
	    }

	    public handleCancel() {
		    this.$store.commit('SET_CONFIRM', {
			    title: '',
			    flag: false,
			    templet: '',
		    })
	    }

	    public mounted() {
		    const maps = new MapAPI().init(document.getElementById('map'));

		    maps.on('click', (e: any) => {
			    this.$mapbox.clickPOI(e, this)
		    });
	    }

	    public created() {
		    this.$axios.getCharacters().then((res: TsCharacters []) => {
			    const temp: any = {}

			    res.map((i: TsCharacters) => {
				    temp[i.characterId] = i
			    })

			    this.$store.commit('SET_CHARACTER', temp)
		    })


		    // 맵레이어 팝업 가고싶어요/갔다왔어요 클릭 이벤트
		    bus.$on('clickHeart', (data: any) => {
			    const { displayName, categoryDisplayName, poi } = data;

			    this.$store.commit('SET_CONFIRM', {
				    title: '가고싶어요 등록 확인',
				    flag: true,
				    templet: `<em>[${categoryDisplayName}]</em><strong class="purple--text text--lighten-2">${displayName}</strong> 이장소를 가고싶어요 목록에 추가할까요?`,
				    func: () => {
					    this.$axios.addWish(poi).then(() => {
						    this.$store.dispatch('ALERT', {
							    color: 'warning',
							    icon: 'check_circle',
							    msg: `가고싶어요에 등록 완료`,
						    });
					    });
				    },
			    })
		    });
		    // axios Error 핸들링
		    bus.$on('error', (err: ErrorState) => {
			    this.$store.dispatch('ALERT', {
				    color: 'white',
				    icon: 'priority_high',
				    msg: err.message,
			    });
            })
	    }
    }

</script>

<style lang="scss">
    html, body{
        overflow: hidden !important;
    }
    a {
        text-decoration: none;
        color: #222;
    }

    // Layout
    #app{
        background: none;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        display: flex;
        flex-direction: row;
        position: fixed;
        width: 100%;
        height: 100%;
    }
    .mapboxLoading{
        display: flex;
        position: fixed;
        background: rgba(255,255,255, .8);
        width: 300px;
        top: 0;
        left: 68px;
        text-align: center;
        height: 100%;
        justify-items: center;
        align-items: center;
        flex-direction: row;
        > div{
            flex-grow: 1;
        }
        .text{
            font-size: 12px;
            position: absolute;
            width: 100%;
            background-color: #fff;
            margin-top: 40px;
        }
    }


    $header-height: 68px;
    #header {
        position: absolute;
        top: 0;
        display: flex;
        width: 100%;
        height: $header-height;
        padding: 8px 10px;
        background: #fff;
        border-bottom: 1px solid #ddd;
        z-index: 999;
        .logo {
            width: 140px;
            height: 50px;
            margin-left: auto;
            background: url(./assets/logo.png);
            font-size: 0;
        }
    }
    .mapboxgl-ctrl-top-right {
        top: $header-height;
    }

    #contents{
        width: 300px;
        margin-top: $header-height;
        box-shadow: 1px 0 6px #888;
        position: relative;
        z-index: 10;
        overflow-x: hidden;
        overflow-y: auto;
        .wrap{
            padding: 0 16px;
        }
    }
    #mapwrap{
        flex-grow: 1;
        position: relative;
        padding-top: 68px;
    }

    /* 맵 POI 클릭시 */
    #map {
        height: 100%;
        .mapboxgl-popup-close-button{
            width: 30px;
            height: 30px;
            overflow: hidden;
            font: normal normal normal 16px/1 "Material Design Icons";
            &::before{
                content: '\F156';
                display: block;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
            }
        }
        .mapboxgl-popup-content{
            padding-bottom: 3px;
        }

        //
        .marker{
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                display: block;
                width: 50px;
                position: relative;
                z-index: 3;
            }
            .ani1, .ani2{
                display: block;
                border-radius: 100%;
                position: absolute;



            }

            .ani1{
                z-index: 1;
                width: 70px;
                height: 70px;
                left: -5px;
                top: -5px;
                opacity: .4;
                background-color: hotpink;
                animation:  fillwater 2s infinite
            }
            .ani2{
                z-index: 2;
                width: 50px;
                height: 50px;
                border: solid 5px #fff;
                left: 5px;
                top: 5px;
                animation:  fillwater2 2s infinite
            }

            //animation:  fillwater 3s infinite

            @-webkit-keyframes fillwater{
                50%{
                    -webkit-transform: scale(.5);
                    opacity: .3;
                }
            }

            @keyframes fillwater{
                50%{
                    -webkit-transform: scale(.5);
                    opacity: .1;
                }
            }

            @-webkit-keyframes fillwater2{
                50%{-webkit-transform: scale(.8);}
            }

            @keyframes fillwater2{
                50%{-webkit-transform: scale(.8);}
            }
        }
    }
    /*
     *  module style overwrite
     */
    // POPUP
    #alertwrap{
        position: fixed;
        width: 90%;
        left: 5%;
        bottom: 10px;
        text-align: center;
        z-index: 100;
    }
    #alert{
        background-color: rgba(0,0,0, .5);
        border-radius: 20px;
        width: fit-content;
    }

    .cover{
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.6);
        .box{
            background-color: #fff;
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            display: inline-block;
        }
    }


    // 로딩스타일
    #loading{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 1001;
        height: 100%;
    }
    #comp-progress{
        position: fixed;
        margin: 0;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 1000;
    }

    //
    .ico{
        font-size: 13px;
        font-weight: bold;
        color: #999;
        .v-icon{
            font-size: 16px;
            vertical-align: middle;

        }
    }


</style>