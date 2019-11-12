import { DefaultPOI, PoiMiniActivityDto } from './pois';
export interface LabelDto {
	createDate:	string; // example: 2018-07-11 13:16:25 	생성일시
	labelId: number; // example: 4 라벨아이디
	labelName: string;	// example: 홍대 	라벨명
	poiCount: number; // example: 1	poi갯수
}

// 가고싶어요 dto
export interface TsGetWish extends DefaultPOI {
	activityMini: PoiMiniActivityDto;
	distance: string; // 직선거리
	isAttr: string; // 속성소유여부(Y/N)
	isClosed: string; // 폐업여부(Y/N)
	isDisplay: string[] ; // [ Y, N ] 서비스 여부
	isDlvRep: string; // 대표 POI 여부(Y/N)
	phoneNumber: string; // 전화번호
	poiType: string; // POI 타입
	labelList: LabelDto[]
	wishCount: number; // 가고싶어요 카운트
}

// 갔다왔어요
export interface PoiVreiefDto extends DefaultPOI {
	stickerFileSocial: string; // 스티커파일명
}

export interface ReviewDto {
	blindMessage: string; // example: 이 리뷰는 신고 처리되어 더 이상 확인할 수 없습니다. 	신고된 리뷰 블라인드 메세지
	characterId: number; // example: 1 작성자 캐릭터 Id 정보
	content: string; // 내용
	createDate: string; // 생성시간
	elapsedTimeString: string; // example: 55초 전 경과 시간 설명
	id: string; // example: befe37fvg3g33g ID
	intro: string; // 사용자 인트로
	isLike: string[]; // example: Y 좋아요 여부
	level: number; // 작성자 캐릭터 레벨
	likeCount: number; // 좋아요 수
	likeMsg: {
		likeActivity: string; // 좋아요 한 사람들 노출문구
		likeFriendCmn: string; // 최근 좋아요한 구독친구
	}
	nickname: string; // 작성자 닉네임
	poi: {
		address: string; // 지번주소
		categoryDisplayName: string; // 카테고리 표출명
		displayName: string; // POI 표출이름
		newAddress: string; // 도로명주소
	}
	poiId: number;
	pointCode: string[]; // example: [ GOOD ] 리뷰 평점
	pointCodeName: string; // example: 괜춘 리뷰 평점명
	recommendIntro: string; // example: 맛집전문가 특별계정 소개
	recommendType: string; // example: ADMIN 특별계정 타입
	reviewPhotos: any[];
	status: string; // example: [ NORMAL, REPORT, BLIND ] - 리뷰 상태 (NORMAL | REPORT | BLIND : BLIND 아니면 다 정상표시)
	statusCode: string; // example: FZ 유저 상태 코드
	updateDate: string; // 수정시간
	userStatusCode: string; // example: FZ 유저 상태 코드
	writeCmn: string; // example: 108100000001855 작성자 cmn
}

export interface TsGetMyReviewList {
	originalCheckStickerFile: string; // 원본 check 스티커 파일명
	poi: PoiVreiefDto
	review: ReviewDto
}
