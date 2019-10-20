// 스토어에서 사용하는 인터페이스
// Alert Module
interface IsAlert {
	color?: string
	icon?: string
	msg?: any
	show?: boolean
}

interface reviewCont {
	characterId: number //5901
	content: string//"또가고싶어요"
	//elapsedTimeString: string //"8개월 전"
	id: string //"5c4ad29330e6ff00079b5c7d"
	//likeMsg: //Object
	nickname: string //"버그싫어요"
	poiId: number //6936353
	pointCode: string//"GOOD"
	pointCodeName: string//"괜춘"
	recommendType: string//"ADMIN"
	writeCmn: string //"108100000001798"
}

// @/store/map/actions.ts
export interface tsMapState {
	wishList: {
		content: any
	}
	wishOpt: {
		sort: string []
		page: number
	}
	reviewList: {
		content: reviewCont []
	}
	detail: {
		info: any;
		more: any [];
		summary: {
			cgoodCount: number;
			greatCount: number;
			photoCount: number;
			photos: any [],
			poiId: number;
			poorCount: number;
			reviewAverage: {};
			reviewCount: number;
			sosoCount: number;
			tags: string []
		}
	}

	recommend: any []; // 추천받기
	subdescMember: any []; // 구독멤버리스트
	myWish: any []; // MY 가고싶어요
	myCheck: any []; // MY 갔다왔어요
	myFriend: any [] // 구독 멤버 관심장소
}

export interface tsCharacters {
	"characterId": number;
	"minimumLevel": number;
	"isAdmin": string;
	"webpMotion1": string;
	"webpMotion2": string;
	"fullColor": string;
	"fullGray": string;
	"faceColor": string;
	"faceGray": string;
	"head": string;
	"createDate": string;
}

// Vuex: mapState Type
export interface rootState {
	isAlert: IsAlert
	isLoading: boolean;
	characters?: tsCharacters [];
	myCollections: any;
	map?: tsMapState;
	confirm: {
		flag: boolean;
		title: string;
		template: string;
		func: {}
	}
}

