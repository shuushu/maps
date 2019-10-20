<template>
    <section class="item">
        <div class="photo-review">
            <h1 class="tit">이장소의 사진 <span v-if="photoCount > 0" class="total blue--text text--lighten-2">{{ photoCount }}</span></h1>

            <div class="thumb" v-if="photos.length > 0">
                <div v-for="item in photos" :key="item.path" class="item">
                    <img :src="getPath(item.path)" alt="">
                </div>
            </div>
            <div v-else class="nodata">
                등록된 후기 사진이 없습니다.
            </div>

            <div v-if="tags" class="tag">
                <span class="item" v-for="hash in tags" :key="hash">#{{ hash }}</span>
            </div>
            <a href="#" class="more">전체보기</a>
        </div>
    </section>
</template>


<script>
    export default {
        name: 'PhotoReview',
        props: {
            photoCount: {
                type: Number,
                default: 0
            },
            photos: {
                type: Array,
                default: []
            },
            tags: {
                type: Array,
                default: []
            },
        },
        methods: {
            clickHeart(f) {
                this.$emit('clickHeart', f);
            },
            clickFlag(f) {
                this.$emit('clickFlag', f);
            },
            getPath(path) {
                return `https://thumbdev.oditto.com/image/${path}`
            }
        }
    }
</script>

<style lang="scss" scoped>
    .photo-review{
        position: relative;
        .more{
            position: absolute;
            right: 0;
            top: 3px;
            font-size: 12px;
        }

        .tit{
            font-size: 14px;
            margin-bottom: 10px;
            .total{
            }
        }
        .nodata{
            font-size: 12px;
            padding: 10px 0 20px;
        }
        .thumb{
            padding: 10px 0;
            display: flex;
            flex-flow: wrap;
            justify-content: space-between;
            .item {
                position: relative;

                margin: 0 0 10px 0;
                &::before{
                    content: '';
                    display: block;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    border: 1px solid #000;
                    opacity: .1;
                    box-sizing: border-box;
                    border-radius: 10px;
                }
                img{
                    border-radius: 10px;
                    width: 110px;
                    height: 110px;
                    display: block;
                }
            }
        }

        .tag{
            padding: 10px 0;
            border-top: 1px dashed #ccc;
            border-bottom: 1px dashed #ccc;
            .item{
                margin: 0 5px;
                font-size: 12px;
            }
        }
    }
</style>