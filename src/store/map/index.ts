import { tsMapState } from '@/ts.interface/store.ts'

import actions from './actions'
import mutations from './mutations'

export const state: tsMapState = {
    wishList: {
	    content: []
    },
    wishOpt: {
        sort: [],
        page: 1
    },
	detail: {
    	info: {},
		more: [],
		summary: {
    		cgoodCount: 2,
			greatCount: 0,
			photoCount: 0,
			photos: [],
			poiId: 8652003,
			poorCount: 0,
			reviewAverage: {},
			reviewCount: 4,
			sosoCount: 2,
			tags: []
		}
	},
	reviewList: {
		content: []
	},
	recommend: [], // 추천받기
	subdescMember: [], // 구독멤버리스트
	myWish: [], // MY 가고싶어요
	myCheck: [], // MY 갔다왔어요
	myFriend: [] // 구독 멤버 관심장소
}

export const map = {
    namespaced: true,
    state,
    mutations,
    actions,
}
