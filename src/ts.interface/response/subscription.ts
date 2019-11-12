export interface MemberInfo {
	characterId: number; // example: 1 케릭터seq
	intro: string // example: 주말마다 경리단길 자기소개
	nickname: string; // example: oKoG75 별명
	recommendIntro: string; // example: 여행 전문 전문가딱지
	recommendType: string[]; //  [ SUPPORTER, ADMIN ] 전문가타입
	reviewCount: number; // example: 3 갔다왔어요
	wishCount: number; // example: 23
}

export interface SubscriptionDetailDto extends MemberInfo {
	friendCmn: string; // example: 108100000000337 관심친구회원번호
	intro: string; // example: 여행은 도전이다 자기소개
	isInterest: string[]; // example: [ Y, N ] 구독 장소 표시 여부
	level: number; // example: 13 레벨
	profileImage: string; // example: c4d4e28b227a477eb73adb07ed02fd34 프로필이미지
}



// 구독 멤버 dto
export interface TsGetSubScription {
	interestCount: number; // 장소표시 구독자 수
	interestList: SubscriptionDetailDto[];
	subscriptionCount: number; // 전체 구독자 수
	subscriptionList: SubscriptionDetailDto[];
}

// 추천 구독 리스트 - 전문가
export interface TsGetSubScription extends MemberInfo {
	cmn: string; // 회원번호
}
// 타인 프로필 정보 조회
export interface UserTargetProfileDto extends MemberInfo {
	cmn: string; // 회원번호
	communityCount: number; // 열린지도 참여개수
	destinationCount: number; // 최근목적지 개수
	isSubscribed: string; // 구독여부  Y
	level: number; // 레벨
	ownBadgeCount: number; // 획득뱃지 개수
	point: number; // 경험치
	remainingPoint: number; // 남은경험치
	subscriptionCount: number; // 구독수
	totalBadgeCount: number; // 총뱃지 개수
	wishCount: number; // 가고싶어요 개수
}
