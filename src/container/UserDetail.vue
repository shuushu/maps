<template>
    <v-flex class="recommendWrap" xs12>
        <Title>사용자정보</Title>
        <div class="userDetail" v-if="userInfoValue">
            <div class="character">
                <img :src="setCharacter()" alt="">
            </div>


            <div class="progress">
                <span class="infos left">
                    LV {{ userInfoValue.level }}
                </span>
                <span class="infos right">
                    다음 레벨까지 {{ totalXp() }}Xp
                </span>
                <v-progress-linear color="blue" :value="currentXp()"></v-progress-linear>
                <div class="types">
                    <v-chip label  color="red lighten-1" text-color="white">
                        {{ userInfoValue.recommendIntro }} / {{ userInfoValue.recommendType }}
                    </v-chip>
                </div>
                <span class="badge">
                    <span class="txt">획득한 뱃지</span>
                    <v-chip color="red" outline >{{ userInfoValue.ownBadgeCount }} / {{ userInfoValue.totalBadgeCount }}</v-chip>
                </span>
            </div>



            <div class="nick-name">
                {{ userInfoValue.nickname }}
            </div>
       

            <div class="state">
                <v-btn block class="item" @click="goLink('wish', userInfoValue.cmn)">
                    <v-icon color="gray lighten-1" >mdi-heart</v-icon>
                    <div class="txt">가고싶어요 {{ userInfoValue.wishCount }}</div>
                </v-btn>
                <v-btn block class="item" @click="goLink('reviews', userInfoValue.cmn)">
                    <v-icon color="gray lighten-1" >mdi-flag-variant-outline</v-icon>
                    <div class="txt">갔다왔어요 {{ userInfoValue.reviewCount }}</div>
                </v-btn>
                <v-btn block class="item">
                    <v-icon color="gray lighten-1">mdi-account</v-icon>
                    <div class="txt">구독횟수 {{ userInfoValue.subscriptionCount }}</div>
                </v-btn>
            </div>
        </div>
    </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'

import Title from '@/components/Title.vue';
import { RootState } from '@/ts.interface/store';
import { UserTargetProfileDto } from '@/ts.interface/response/subscription';
import { TsGetCharacters } from '@/ts.interface/response/biz';

@Component({
	components: { Title },
	computed: {
		...mapState({
			characters: (state: RootState) => state.characters,
			myCollections: (state: RootState) => state.myCollections,
		}),
	},
})

export default class Recommend extends Vue {
	public characters: RootState['characters'];
	public userInfoValue: any = false;

    public created() {
        const { cmn } = this.$route.params;

        if (cmn) {
	        this.$axios.getUserInfo(cmn).then((data: UserTargetProfileDto) => {
        		if (data) {
        			this.userInfoValue = data
                }
            })
        }
    }
	public currentXp() {
    	if (this.userInfoValue) {
		    return (this.userInfoValue.point / this.totalXp()) * 100
        }
	}
	public totalXp() {
    	if (this.userInfoValue) {
		    return this.userInfoValue.point + this.userInfoValue.remainingPoint
        }
	}
	public setCharacter() {
		const KEY = this.userInfoValue.characterId;
		return `https://thumbdev.oditto.com/image/${this.characters[KEY].webpMotion1}`
	}
	private goLink(path: string, key: string) {
		const data = {
			name: path,
			query: { key },
		};

		this.$router.push(data)
	}
}
</script>

<style lang="scss">
// 구독추천리스트
.userDetail {
    border-top: 1px solid #ccc;
    padding-top: 20px;
    .character {
        text-align: center;
        height: 140px;
        img {
            width: 140px;
        }
    }
    .state{
        $c: #999;

        display: flex;
        border: 1px solid $c;
        border-radius: 3px;
        overflow: hidden;
        .item{
            width: 33.3%;
            color: $c;
            text-align: center;
            margin: 0;
            height: 60px;
            background-color: #fff !important;
            box-shadow: none !important;
            &:nth-child(2) {
                border-left: 1px solid $c;
                border-right: 1px solid $c;
            }
            .v-btn__content{
                flex-direction: column;
            }
            .txt{
                display: block;
                font-size: 12px;
                letter-spacing: -1px;
                color: #333;
            }
        }
    }
    .nick-name{
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin: 10px 0 20px 0;

    }
    .progress{
        position: relative;
        padding-top: 5px;
        font-size: 12px;
        margin: 5px 0 20px;
        padding-bottom: 20px;
        .infos{
            position: absolute;
            top: 0;
            &.left{
                color: royalblue;
            }
            &.right{
                right: 0;
            }
        }
        .types{
            position: absolute;
            bottom: 0;
            .v-chip__content{
                padding: 0 5px;
                font-size: 11px;
                max-width: 110px;
                white-space: normal;
            }

        }
        .badge {
            position: absolute;
            bottom: 0;
            right: 0;
            font-size: 12px;
            .txt{
                position: relative;
                top: -3px;
                left: -8px;
                vertical-align: bottom;
                background-color: rgba(white, .6);
                color: #ef5350;
            }
        }
        .v-chip.v-chip.v-chip--outline,
        .v-chip,
        .v-chip__content{
            margin: 0;
            min-height: 23px;
        }
    }

}
</style>