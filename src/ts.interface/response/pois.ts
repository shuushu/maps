//
// POI미니 한줄 Activity dto
export interface PoiMiniActivityDto {
	activityMiniMsg: string // example: 나와 경진 님이 가고 싶어하는 장소: 나,관심친구 Activity MSG(한줄)
	friendCmn: string // example: 107000000000023,107000000000024	나,관심친구 Activity CMN(한줄)
}
// POI상세 두줄(wish/check) Activity dto
export interface PoiDetailActivityDto {
	checkActivity: string; // 나,관심친구 Activity MSG(Check)
	checkFriendCharecterId: number; // 나,관심친구 Activity 캐릭터(Check) 아이디
	checkFriendCmn: string; // 나,관심친구 Activity Cmn(Check)
	checkFriendProfileImage: string; // 나,관심친구 Activity ProfileImage
	checkMainCharecterId: number; // 나,관심친구 Activity 대표 캐릭터(Check) 아이디
	checkMainCmn: string; // 나,관심친구 Activity 대표(Check) 아이디
	checkMainProfileImage: string; // 나,관심친구 Activity 대표 ProfileImage
	wishActivity: string; // 나,관심친구 Activity MSG(Wish)
	wishFriendCharecterId: number; // 나,관심친구 Activity 캐릭터(Wish) 아이디
	wishFriendCmn: string;  // 나,관심친구 Activity Cmn(Wish)
	wishFriendProfileImage: string; // Activity Profile Image
	wishMainCharecterId: number; // Activity 대표 캐릭터(Wish) 아이디
	wishMainCmn: string; // 나,관심친구 Activity 대표(Wish) 아이디
	wishMainProfileImage: string; // 나,관심친구 Activity 대표 ProfileImage
}
export interface BusinessHoursDto {
	etc: string; // 기타정보
	fri: string; // 금
	holidayInfo: string; // 공휴일 정보
	isHolidayOff: string[]; // 공휴일 여부
	lastUpdateDate: string; // example: 2019-09-30 16:41:33  마지막업데이트 일시
	mon: string; // example: 10:00~16:00|17:00~18:00 월
	sat: string; // example: 10:00~16:00|17:00~18:00 토
	sun: string; // example: 10:00~16:00|17:00~18:00 일
	thu: string; // example: 10:00~16:00|17:00~18:00 목
	tue: string; // example: 10:00~16:00|17:00~18:00 화
	wed: string; // example: 10:00~16:00|17:00~18:00 수
}

// POI 커뮤니티 Summary 정보 dto
export interface CommunitySummaryDto {
	attrImgPath: string; // 커뮤니티맵 속성이미지
	buttonLabel: string // example: 애견동반 가능한 곳으로 참여해주세요. 커뮤니티맵 버튼 라벨
	commonImgOffPath: string; // 커뮤니티맵 라벨이미지 OFF
	commonImgOnPath: string; //  커뮤니티맵 라벨이미지 ON
	communityId: number; // 커뮤니티맵 ID
	communityMessage: string; // example: +999 명이 참여한 장소입니다. 	커뮤니티맵 메세지
	communityPartner: any;
	communityStickerFile: string; // 커뮤니티맵스티커파일명
	count: number; // 커뮤니티맵 참여 카운트
	detailImgOffPath: string; // 커뮤니티맵 상세이미지 OFF
	detailImgOnPath: string; // 커뮤니티맵 상세이미지 ON
	isAddInfo: string; // example: N 커뮤니티맵 파트너 제휴업체정보 존재여부
	isFirst: string; // example: N 최초 참여여부
	joinMessage: string; // example: 애견동반 가능한 곳으로 참여해 주실래요? 커뮤니티맵 참여 메세지
	label: string // example: 애견동반 커뮤니티맵 속성이름
	poiId: number; // POI ID
}


// POI속성소분류 dto
export interface PoiAttrSubDto {
	attrCode: string; // example: BABY_LOUNGE POI 속성코드
	attrValue: string; // example: N POI 속성값
	codeName: string; // example: 유아시설 POI 속성명
}

// 사진 목록
export interface ReviewPhotoDto {
	createDate: string; // 생성시간
	name: string; // example: Lighthouse3.jpg photo name
	path: string; // example: 5be480f2aa4d4045a117024c853b1fe8	photo path
}

export interface PoiReviewAveragePointDto {
	code: string[]; // example: GOOD 리뷰 평점 평균 코드
	name: string; // example: 강추 평점 평균 명
	point: number; // example: 4.1 평점 평균
}



export interface TsgetDetailSummary {
	goodCount: number; // 괜춘 카운트
	greatCount: number // 강추 카운트
	photoCount: number; // 사진 수
	photos: ReviewPhotoDto[]
	poiId: number; // POI ID
	poorCount: number; // 비추 카운트
	reviewAverage: PoiReviewAveragePointDto
	reviewCount: number; // 리뷰 수
	sosoCount: number; // 쏘쏘 카운트
	tags: string[]; // example: 청담맛집 별로임 ... 내용
}

// 가고싶어요 & POI상세
export interface DefaultPOI {
	address: string; // 지번주소
	categoryCode: string; // 카테고리 코드
	categoryDisplayName: string; // 카테고리 표출명
	centerWgs84Lat:	number; // 중심위도
	centerWgs84Lon:	number; // 중심경도
	displayName: string; // POI 표출이름
	isCheck: string; // 내가 Check 했는지 여부(Y/N)
	isWish: string; // 내가 Wish 했는지 여부(Y/N)
	navSeq: number; // 내비게이션 시퀀스
	navWgs84Lat: number; // 내비위도
	navWgs84Lon: number; // 내비경도
	newAddress: string; // 도로명주소
	poiId: number; // POI ID
	reviewAverage: any; // 커뮤니티맵 제휴업체 정보 dto
	reviewCount: number; // 리뷰 카운트
	rpFlag:	string; // Tmap SDK rpFlag
	stickerFile: string; // 스티커파일명
}

// POI 상세
export interface TsDetailPOI extends DefaultPOI {
	activityMini: PoiMiniActivityDto;
	activityMsg: PoiDetailActivityDto;
	aoiCode: string; // AOI Code
	businessHours: BusinessHoursDto;
	communitySummary: CommunitySummaryDto[];
	distance: string; // 직선거리
	isAttr: string; // 속성소유여부(Y/N)
	isClosed: string; // 폐업여부(Y/N)
	isDisplay: string[] ; // [ Y, N ] 서비스 여부
	isDlvRep: string; // 대표 POI 여부(Y/N)
	isWishable: string; // Wish/Check 가능 여부
	stickerFileCategory: string; // 카테고리 스티커 파일명(친구별을카테고리 스티커로 신규구분) -v1.1 이상
	stickerFileDefault: string; // 스티커파일명 Default
	stickerFileSocial: string; // 스티커파일명 with social - v1.1 미만
	wishCount: number; // 가고싶어요 카운트
}

// POI속성대분류 dto
export interface TsDetailPOImore {
	attrCode: string; // example: BABY_LOUNGE POI 속성코드
	codeName: string; // example: 유아시설 POI 속성명
	displayOrder: number; // example: 1 POI 속성명 표출순서
	phoneNumber: string; // 전화번호
	poiType: string; // POI 타입
	subAttr: PoiAttrSubDto[];
}
