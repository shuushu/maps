// 스토어에서 사용하는 인터페이스
// Alert Module
interface IsAlert {
	color?: string
	icon?: string
	msg?: any
	show?: boolean
}

interface ReviewCont {
	characterId: number
	content: string
	id: string
	nickname: string
	poiId: number
	pointCode: string
	pointCodeName: string
	recommendType: string
	writeCmn: string
}

// @/store/map/actions.ts
export interface TsMapState {
	wishList: {
		content: any;
	}
	reviewList: {
		content: ReviewCont [];
	}
	detail: {
		info: any;
		more: any [];
		summary: {
			goodCount: number;
			greatCount: number;
			photoCount: number;
			photos: any [];
			poiId: number;
			poorCount: number;
			reviewAverage: {};
			reviewCount: number;
			sosoCount: number;
			tags: string [];
		}
	}
	recommend: any []; // 추천받기
	subdescMember: any []; // 구독멤버리스트
	myWish: any []; // MY 가고싶어요
	myCheck: any []; // MY 갔다왔어요
	myFriend: any []; // 구독 멤버 관심장소
}

export interface TsCharacters {
	characterId: number;
	minimumLevel: number;
	isAdmin: string;
	webpMotion1: string;
	webpMotion2: string;
	fullColor: string;
	fullGray: string;
	faceColor: string;
	faceGray: string;
	head: string;
	createDate: string;
}

// Vuex: mapState Type
export interface RootState {
	isAlert: IsAlert
	isLoading: boolean;
	characters?: TsCharacters [];
	myCollections: any;
	map?: TsMapState;
	confirm: {
		flag: boolean;
		title: string;
		template: string;
		func: any;
	}
}


