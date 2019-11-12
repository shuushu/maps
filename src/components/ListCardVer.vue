<template>
    <div class="list-card-ver">
        <v-btn class="face" @click="imgClick(cmn)">
            <img :src="setCharacter(characterId)" :alt="nickname" />
        </v-btn>
        <div class="label">{{ label }}</div>
        <div class="nickname">{{ nickname }}</div>
        <div class="intro">{{ intro }}</div>
        <div class="opt">
            <Flag :review="reviewCount" :wish="wishCount" />
        </div>
        <v-btn class="join" @click="setJoin(cmn)" color="pink lighten-2" outline small>구독신청</v-btn>
    </div>
</template>


<script>
import Flag from './Flag.vue'

export default {
    name: 'ListCardVer',
    components: { Flag },
    props: {
        label: {
            type: String,
            default: 'Label Value',
        },
        nickname: {
            type: String,
            default: '닉네임값',
        },
        intro: {
            type: String,
            default: '안녕하세요 어디또에 많이 이용해주세요',
        },
        reviewCount: {
            type: Number,
            default: 0,
        },
        wishCount: {
            type: Number,
            default: 0,
        },
        cmn: {
            type: String,
            default: '0',
        },
        characterId: {
            type: String,
            default: '',
        },
    },
    methods: {
        imgClick(cmn) {
            this.$emit('imgClick', cmn);
        },
        setCharacter(src) {
            try {
                const path = src || 'c661dbae683e44419baa216e21be1308'
                return `https://thumbdev.oditto.com/image/${path}`
            } catch (ex) {
                return 'http://placehold.it/100x100'
            }
        },
        setJoin(cmn) {
            this.$emit('setJoin', cmn);
        },
    },
}
</script>


<style lang="scss" scoped>

    .list-card-ver{
        position: relative;
        width: 120px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 10px;
        padding-bottom: 45px;
        .face{
            border-radius: 100%;
            padding: 0;
            height: 60px;
            min-width: 60px;
            display: block;
            margin: 0 auto;
            box-shadow: none;
            background: #fff;

            img{ width: 50px; }
        }
        .label{
            font-size: 11px;
            color: #999;
        }
        .nickname{
            display: block;
            margin: 3px 0 5px;
            font-weight: bold;
            font-size: 14px;
            word-break: break-all;
        }
        .intro{
            overflow: hidden;
            display: block;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 11px;

        }
        .opt{
            position: absolute;
            right: 10px;
            top: 5px;
        }
        .join{
            display: block;
            position: absolute;
            right: 15px;
            height: 25px;
            bottom: 10px;
            margin: 5px auto 0;
            font-size: 11px;
        }

    }

</style>