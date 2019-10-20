<template>
    <div>
        <h2 class="tit">좋아요 <span class="total">{{ likelist.totalElements }}</span></h2>
        <v-flex class="list-wrap" xs12>
            <v-list-tile v-for="like in likelist.content">
                <div class="label">
                    <v-chip color="indigo lighten-2" text-color="white" label v-if="like.recommendIntro !== null">{{ like.recommendIntro }}</v-chip>
                    <div style="height:18px;margin-bottom:5px;" v-else></div>
                    <v-list-tile-title>{{ like.nickname }}</v-list-tile-title>
                    <v-btn class="img" @click="goLink(like.cmn)">
                        <img class="bg" :src="setCharacter(like.characterId)" :alt="like.characterId" />
                    </v-btn>
                </div>
            </v-list-tile>
        </v-flex>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component({
        methods: {
            setCharacter(src) {
                return require(`@/assets/character/face/${src}.png`)
            },
            goLink(cmn) {
                this.$router.push({
                    name: 'userdetail',
                    params: {
                        cmn: cmn,
                    }
                })
            }
        }
    })
    export default class LikeList extends Vue {
        private likelist: array = []

        get poiId() {
            return this.$route.query.poiId
        }
        get reviewId() {
            return this.$route.query.reviewId
        }

        getLikeList(): void {
            const data = {
                poiId: this.poiId,
                reviewId: this.reviewId,
            }
            this.$run('map/REVIEW_LIKE_LIST', data)
                .then((res: any) => {
                    this.likelist = res
                }).catch(err => {
                    console.log(err)
            })
        }

        async created() {
            this.getLikeList()
        }
    }
</script>

<style lang="scss">
    .layer{
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
    // 구독한 리스트
    .list-wrap{
        .img{
            padding: 0;
            margin: 0;
            height: 60px;
            min-width: 60px;
            position: absolute;
            bottom: 10px;
            right: -10px;
            box-shadow: none !important;
            background: none !important;
            .bg{
                width: 60px;
            }
        }

        top: 40px;
        .remove{
            display: block;
            font-size: 12px;
            position: absolute;
            right: -27px;
            top: 28%;
            margin-top: -16px;
            height: 28px
        }
        .check{
            position: absolute;
            left: -2px;
            top: 22px;
        }

        .v-list__tile__action{
            min-width: 37px;
        }
        .v-list__tile{
            position: relative;
            padding: 15px 0;
            padding-right: 50px;
            display: block;
            height: auto;
            border-top: 1px solid #ccc;
        }
        .v-list__tile__title{
            // padding-left: 30px;
            font-size: 15px;
            font-weight: bold;
        }
        .v-list__tile__sub-title{
            font-size: 12px;
        }
        // 라벨
        .v-chip{
            margin: 0;
            font-size: 11px;
            margin-bottom: 5px;
            .v-chip__content{
                height: 18px;
            }
        }
    }
</style>