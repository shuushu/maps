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
import { rootState } from '@/ts.interface/store.ts'


import { mapbox } from '@/common/map.ts'
import Title from "@/components/Title";
import ListCardVer from "../components/ListCardVer";


@Component({
	components: {ListCardVer, Title },
	computed: {
		...mapState({
			myCollections: (state: rootState) => state.myCollections,
			recList: (state: rootState) => state.map.recommend,
			characters: (state: rootState) => state.characters,
		}),
	},
	methods: {
		setCharacterImg(id) {
			return this.characters[id.characterId].faceColor
		},
		setJoin(data: string) {
			this.$axios.joinSubscript(data)
			this.$store.dispatch('ALERT', {
				color: 'warning',
				icon: 'check_circle',
				msg: `구독 신청 하였습니다.`,
			});
			this.layerReset();
			this.$router.push({ name: 'subdescript', params: { key: 'reload'} } )
		},
		layerReset() {
			for (let key in this.myCollections) {
				this.myCollections[key].forEach((item: string) => {
					this.$mapbox.clearMapLayer(item)
					this.$mapbox.maps.off('click', item, this.mapMove)
				})
			}
		}
	}
})

export default class Recommend extends Vue {
    public created() {
	    this.$run('map/GET_RECOMMEND');
    }
    public imgClick(cmn) {
	    this.$router.push({
            name: 'userdetail',
            params: {
	            cmn: cmn
            }
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