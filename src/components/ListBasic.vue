<template>
    <div class="member--list">
        <v-chip class="label" color="indigo lighten-2" text-color="white" label>{{ label }}</v-chip>


        <v-checkbox class="check" v-model="handleCheck"  :value="friendCmn">
            <template v-slot:label>
                <span class="name">{{ nickname }}</span>
            </template>
        </v-checkbox>

        <div class="intro">{{ intro }}</div>
        <Flag :review="reviewCount" :wish="wishCount" />
        <v-btn class="img" @click="imgClick(friendCmn)">
            <img  class="bg" :src="setCharacter(characterId)" :alt="characterId" />
        </v-btn>

        <v-btn class="remove" @click="remove(friendCmn)" color="indigo lighten-1" flat small>구독취소</v-btn>
    </div>
</template>


<script>
import Flag from './Flag.vue'
export default {
    name: 'ListBasic',
    components: { Flag },
    props: {
        label: {
            type: String,
            default: 'Label Value'
        },
        nickname: {
            type: String,
            default: '닉네임값'
        },
        intro: {
            type: String,
            default: '안녕하세요 어디또에 많이 이용해주세요'
        },
        reviewCount: {
            type: Number,
            default: 0
        },
        wishCount: {
            type: Number,
            default: 0
        },
        friendCmn: {
            type: String,
            default: '0'
        },
        characterId: {
            type: String,
            default: ''
        },
        isInterest: {
            type: String,
            default: 'sdN'
        }
    },
    methods: {
        imgClick(cmn) {
            this.$emit('imgClick', cmn);
        },
        setCharacter(src) {
            try {
                return `https://thumbdev.oditto.com/image/${src}`
            } catch (ex) {
                return 'http://placehold.it/100x100'
            }
        },
        remove(cmn) {
            this.$emit('remove', cmn);
        },
        checkedValue(f) {
            if (f === 'Y') {
                this.handleCheck = this.friendCmn
            }
        }
    },
    data () {
        return {
            handleCheck: null,
        }
    },
    watch: {
        handleCheck(v) {
            this.$emit('handleCheck', {
                friendCmn: this.friendCmn,
                value: v
            });
        }
    },
    created() {
        this.checkedValue(this.isInterest)
    }
}
</script>


<style lang="scss" scoped>
    .member--list{
        position: relative;
        padding: 15px 10px;
        border-bottom: 1px solid #ccc;

        .img{
            padding: 0;
            margin: 0;
            height: 60px;
            min-width: 60px;
            position: absolute;
            top: 20px;
            right: 10px;
            box-shadow: none !important;
            background: none !important;
            .bg{
                width: 60px;
            }
        }
        .v-chip{
            margin: 0;
            font-size: 11px;
            margin-bottom: 5px;
            height: 23px;
        }
        .name{
            display: block;
            font-size: 20px;
            font-weight: bold;
            color: #000;
            letter-spacing: -1px;
        }
        .check{
            margin-top: 10px;
            .name{
                position: relative;
                top: -4px;
            }
        }

        .intro{
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            margin: -20px 0 5px;
        }
        .v-icon{
            vertical-align: middle;
        }
    }
    
    /*

        .myBtn{
            margin: 10px 0;
        }



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

        > div:first-child {
            border: 0;
        }

        .v-list__tile__title{
            padding-left: 30px;
            font-size: 15px;
            font-weight: bold;
        }
        .v-list__tile__sub-title{
            font-size: 12px;
        }*/

</style>