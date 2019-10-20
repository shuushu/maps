<template>
    <div class="list-card-hor">
        <div class="name">
            <span class="cate">[{{ categoryDisplayName }}]</span>
            <span class="name">{{ displayName }}</span>
            <!-- 평점-->
            <span v-if="reviewAverageCode" :class="`review ${reviewAverageCode}`">{{ reviewAverageName }}</span>
        </div>
        <div class="util">
            <address class="address">{{ newAddress }}</address>
            <span class="phone">{{ phoneNumber }}</span>
        </div>
        <slot></slot>
    </div>
</template>


<script>
export default {
    name: 'ListCardHor',
    props: {
        categoryDisplayName: {
            type: String,
            default: '분류'
        },
        displayName: {
            type: String,
            default: '가게이름'
        },
        reviewAverageCode: {
            type: String,
            default: ''
        },
        reviewAverageName: {
            type: String,
            default: ''
        },
        newAddress: {
            type: String,
            default: '인천 중구 숲쟁이로'
        },
        phoneNumber: {
            type: String,
            default: ''
        }
    }
}
</script>


<style lang="scss" scoped>
    .list-card-hor{
        position: relative;
        border: 1px solid #ccc;
        border-radius: 20px;
        margin: 10px 0;
        padding: 10px 15px;

        .cate{
            color: #999;
            font-size: 12px;
            margin-right: 3px;
            position: relative;
            top: -1px;
        }
        .review{
            color: indianred;
            font-size: 12px;
            $size: 20px;
            &::before{
                content: '';
                width: $size;
                height: $size;
                display: inline-block;
                vertical-align: middle;
                margin-left: 5px;
                background-size: $size $size;
            }
            &.GREAT::before{ background-image: url('../assets/ico/great.png');}
            &.SOSO::before{ background-image: url('../assets/ico/soso.png');}
            &.GOOD::before{ background-image: url('../assets/ico/good.png');}
            &.BAD::before{ background-image: url('../assets/ico/bad.png');}
        }
        .util{
            margin: 5px 0;
            font-size: 12px;
            color: #666;
            .address{
                font-style: normal;
            }
        }
        .time {
            font-size: 12px;
            color: #888;
            margin-left: 8px;
            &:before {
                content: "·";
                margin-right: 8px;
            }
        }
        .contents {
            ul {
                margin: 0;
                padding: 0;
                li {
                    list-style: none;
                    display: inline-block;
                    width: 80px;
                    margin-right: 12px;
                    vertical-align: top;
                    &:last-child {
                        margin-right: 0;
                    }
                    a {
                        display: block;
                    }
                    img {
                        max-width: 100%;
                    }
                }
            }
        }
        .like {
            margin: 6px 0;
            span {
                margin-left: 6px;
                cursor: pointer;
            }
        }
    }
    .ovr-x-s {
        overflow-x:scroll;
    }
</style>