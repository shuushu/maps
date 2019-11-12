<template>
    <div class="click-pop">
        <h5 class="name">{{ displayName }}</h5>
        <div class="type">
            <span class="cate">{{ categoryDisplayName }}</span>
            <!--<span class="revAverage" v-if="resData.reviewAverage"> / {{resData.reviewAverage.name}}</span>-->
        </div>
        <div class="phone">TEL: {{ phoneNumber }}</div>
        <div class="address">주소: {{ newAddress }}</div>
        <div class="util">
            <Flag :review="reviewCount" :wish="wishCount"
                  @clickHeart="clickHeart(eventBus)"
                  @clickFlag="clickFlag(eventBus)"
            />

            <button type="button" class="btn v-btn v-btn--flat v-btn--icon theme--light deep-orange--text">
                <div class="v-btn__content"><i aria-hidden="true" class="v-icon mdi mdi-share-variant"></i></div>
            </button>
        </div>
    </div>
</template>

<script>
import Flag from './Flag.vue'
import bus from '../service/axiosClient'

export default {
	name: 'MapPOP',
    components: { Flag },
    props: {
        displayName: {
            type: String,
            default: 'storeName',
        },
        categoryDisplayName: {
            type: String,
            default: '분류',
        },
        phoneNumber: {
            type: String,
            default: '032-111-1111',
        },
        newAddress: {
            type: String,
            default: '서울시 중구 소월로',
        },
        wishCount: {
            type: Number,
            default: 32,
        },
        reviewCount: {
            type: Number,
            default: 322,
        },
        poi: {
            type: Number,
            default: 0,
        },
        eventBus: {
            type: String,
            default: 'none',
        },
    },
    methods: {
        clickHeart(f) {
            // 이벤트버스로 전파될 때
            if (f === 'none') {
                bus.$emit('clickHeart', this);
            } else {
                // 컴포넌트로 이벤트 전파될 때
                this.$emit('clickHeart', f);
            }
        },
        clickFlag(f) {
            // 이벤트버스로 전파될 때
            if (f === 'none') {
                bus.$emit('clickFlag', this);
            } else {
                // 컴포넌트로 이벤트 전파될 때
                this.$emit('clickFlag', f);
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.click-pop{
    padding-right: 20px;
    .name{
        font-size: 16px;
        margin-bottom: 5px;
        > span{
            font-size: 12px;
        }
    }
    .phone{
    }
    .util{
        .v-icon{
            font-size: 16px;
        }
        .btn{
            margin: -5px 0 0 0;
            font-size: 14px;
            color: indianred;
        }
    }
}
</style>