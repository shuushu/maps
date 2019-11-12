<template>
    <v-flex class="recommendWrap" xs12>
        <Title :count="Number(recList.length)">추천리스트</Title>
        <div class="list-card-wrap" v-if="recList.length > 0">
            <ListCardVer v-for="(i, idx) in recList"
                :key="`rec-${idx}`"
                v-bind="i"
                :label="i.recommendIntro"
                :characterId="setCharacterImg(i)"
                @imgClick="imgClick"
                @setJoin="setJoin"
            />
        </div>
    </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { RootState } from '@/ts.interface/store.ts'
import { MemberInfo } from '@/ts.interface/response/subscription.ts'

import Title from '@/components/Title.vue';
import ListCardVer from '@/components/ListCardVer.vue';


@Component({
	components: { ListCardVer, Title },
	computed: {
		...mapState({
			myCollections: (state: RootState) => state.myCollections,
			recList: (state: RootState) => state.map.recommend,
			characters: (state: RootState) => state.characters,
		}),
	},
	methods: {

	},
    created() {
	    this.$run('map/GET_RECOMMEND');
    },
})

export default class Recommend extends Vue<RootState> {
	public characters: RootState['characters'];

	private setCharacterImg(id: MemberInfo) {
		return this.characters[id.characterId].faceColor
	}
	private setJoin(data: string) {
		this.$axios.joinSubscript(data)
		this.$store.dispatch('ALERT', {
			color: 'warning',
			icon: 'check_circle',
			msg: `구독 신청 하였습니다.`,
		});
		this.layerReset();
		this.$router.push({ name: 'subdescript', params: { key: 'reload'} } )
	}
	private layerReset() {
		for (const key in this.myCollections) {
			if (this.myCollections[key].length > 0) {
				this.myCollections[key].forEach((item: string) => {
					this.$mapbox.clearMapLayer(item)
				})
			}
		}
	}
	private imgClick(cmn: string) {
		this.$router.push({
			name: 'userdetail',
			params: { cmn },
		})
	}
}
</script>

<style lang="scss" scoped>
.list-card-wrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>