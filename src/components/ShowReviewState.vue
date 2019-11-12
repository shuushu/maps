<template>
    <div class="reviewRating">
        <div v-if="reviewAveragePoint > 0">
            <div class="avg">
                <span :class="`review ${reviewAverageCode}`">{{ reviewAverageName }}</span>
                <v-rating
                        v-model="reviewAveragePoint"
                        :length="length"
                        :empty-icon="emptyIcon"
                        :full-icon="fullIcon"
                        :half-icon="halfIcon"
                        :half-increments="halfIncrements"
                        :readonly="readonly"
                        :size="size"
                        :color="color"
                        :dense="dense"
                        :background-color="bgColor"
                ></v-rating>
            </div>
            <ul>
                <li>아니? 이런 곳이 있다늬? : {{ greatCount }}</li>
                <li>나쁘지 않았어요 : {{ goodCount }}</li>
                <li>그저그래요: {{ sosoCount }}</li>
                <li>구려요 : {{ poorCount }}</li>
            </ul>
        </div>
        <div v-else>평점이 아직 등록 안됨</div>
    </div>
</template>


<script>
    export default {
        name: 'ShowReviewState',
        data: () => ({
            emptyIcon: 'mdi-heart-outline',
            fullIcon: 'mdi-heart',
            halfIcon: 'mdi-heart-half-full',
            halfIncrements: true,
            dense: true,
            length: 5,
            readonly: true,
            size: 15,
            color: 'red lighten-3',
            bgColor: 'grey lighten-1',
            bgColors: 'grey lighten-2',
        }),
        props: {
            goodCount: {
                type: Number,
                default: 0,
            },
            greatCount: {
                type: Number,
                default: 0,
            },
            poorCount: {
                type: Number,
                default: 0,
            },
            reviewAverageCode: {
                type: String,
                default: '',
            },
            reviewAverageName: {
                type: String,
                default: '',
            },
            reviewAveragePoint: {
                type: Number,
                default: 0,
            },
            reviewCount: {
                type: Number,
                default: 0,
            },
            sosoCount: {
                type: Number,
                default: 0,
            },
        },
    }
</script>

<style lang="scss" scoped>
    .reviewRating{
        margin: 10px 0;
        font-size: 12px;
        padding: 5px 0;
        border-top: 1px dashed #ccc;
        border-bottom: 1px dashed #ccc;
        .avg{
            display: flex;
            margin: 5px 0;
        }
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
</style>