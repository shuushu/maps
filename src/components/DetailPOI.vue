<template>
    <div class="detail">
        <section class="item">
            <h3 class="tit">
                {{ displayName }}
                <span class="cate">{{ categoryDisplayName }}</span>
                <span v-if="distance.length > 0" class="distance">{{ distance }}</span>
            </h3>

            <ShowReviewState v-if="Object.keys(reviewStateValue).length > 0" v-bind="reviewStateValue" />

            <Flag :review="reviewCount" :wish="wishCount" />
            <p class="activityMiniMsg">
                {{ activityMiniMsg }}
                <!--{{ data.activityMini.activityMiniMsg }}-->
            </p>

            <div class="address">
                <v-icon>mdi-map-marker-radius</v-icon>
                <div>{{ newAddress }}</div>
                {{ address }}
            </div>

            <div class="phone">
                <v-icon>mdi-phone</v-icon>
                {{ phoneNumber }}
            </div>

            <!-- MORE -->
            <div :class="show ? 'storeInfo strech' : 'storeInfo'" v-if="moreDetail.length > 0">
                <div class="subAttr-list-wrap" v-for="(i, idx) in moreDetail" :key="`items-${idx}`">
                    <span class="codeName">{{ i.codeName }}</span>
                    <span class="subAttr-list-cont" v-html="i.attrValue" />
                </div>


                <div class="btnWrap" v-if="show" @click="show = false">
                    <v-btn icon>
                        <v-icon>keyboard_arrow_down</v-icon>
                    </v-btn>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Flag from './Flag.vue'
import ShowReviewState from './ShowReviewState';

export default {
    name: 'DetailPOI',
    components: {ShowReviewState, Flag },
    props: {
        displayName: {
            type: String,
            default: '가게이름',
        },
        categoryDisplayName: {
            type: String,
            default: '맛집',
        },
        reviewCount: {
            type: Number,
            default: 0,
        },
        wishCount: {
            type: Number,
            default: 0,
        },
        newAddress: {
            type: String,
            default: '인천 중구 숲쟁이로',
        },
        address: {
            type: String,
            default: '구) 인천 중구 운남동 1640-82',
        },
        phoneNumber: {
            type: String,
            default: '032-000-0000',
        },
        activityMiniMsg: {
            type: String,
            default: '나의 관심장소',
        },
        distance: {
            type: String,
            default: '',
        },
        moreDetail: {
            type: Array,
            default: [],
        },
        reviewStateValue: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            show: true,
        }
    },
}
</script>


<style lang="scss" scoped>
.detail{
    .cate{
        color: indianred;
        font-size: 11px;
    }
    .distance{
        font-size: 12px;
        font-weight: normal;
        color: #888;
        vertical-align: bottom;
        margin-left: 5px;
    }
    .subAttr-list-wrap{
        display: flex;
        flex-wrap: wrap;
        margin: 5px 0 3px;
    }
    .subAttr-list-cont{
        font-size: 12px;
        color: #777;
    }
    .codeName{
        display: block;
        font-size: 12px;
        margin-right: 10px;
        &::before{
            content: '';
            display: inline-block;
            width: 2px;
            height: 2px;
            vertical-align: middle;
            background-color: #666;
            margin-right: 3px;
            border-radius: 100%;
        }
    }
    .storeInfo{
        position: relative;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px dashed #aaa;
        word-break: break-all;
        .btnWrap{
            display: none;
            position: absolute;
            bottom: 0;
            background-color: rgba(white, .7);
            text-align: center;
            left: 0;
            width: 100%;
        }
        &.strech {
            overflow: hidden;
            max-height: 100px;
            .btnWrap{
                display: block;
            }
        }
    }
    .attrValue{
        font-size: 12px;
        line-height: 1.5;
        color: #666;
    }

    .activityMiniMsg{
        margin-top: 5px;
        font-size: 12px;
        color: #888;
    }

    .item{
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin: 14px 0;
    }
    .category{
        font-size: 11px;
        color: #999;
        margin-bottom: 5px;
        .red--text{
            font-size: 12px;
        }
    }
    .detail{
        .subtit{
            margin: 10px 0;
            font-size: 14px;
        }
        .parag{
            color: #777;
            font-size: 12px;
            margin-bottom: 20px;
        }
    }
    .headline{
        padding-bottom: 10px;
    }
    .phone,
    .address{
        position: relative;
        font-size: 13px;
        padding-left: 24px;
        color: #777;
        .v-icon{
            position: absolute;
            left: 0;
            top: 3px;
            font-size: 20px;
        }
    }
    .phone{
        margin-top: 10px;
        .v-icon{
            top: 2px;
            left: 3px;
            font-size: 16px;
        }
    }
}
</style>