// 내 구독장소
export interface TsGetMyPoi {
	centerWgs84Lat:	number; // example: 37.57022 중심위도
	centerWgs84Lon: number; // example: 127.01378 중심경도
	displayName: string; // example: 너랑나랑 POI 표출이름
	poiId: number; // example: 19492 POI ID
	stickerFile: string; // example: s_station 스티커파일명
	stickerFileCategory: string; // 카테고리 스티커 파일명(친구별을카테고리 스티커로 신규구분) - v1.1 이상 버전
	stickerFileSocial: string; // example: network 소셜 스티커파일명 - v1.1 이하 버전
	viewLevel: number;
}

// 구독장소 보기 (타인기준)
export interface TsGetDescriptPoi extends TsGetMyPoi {
	viewLevel: number; // 1 POI 표출레벨
}
