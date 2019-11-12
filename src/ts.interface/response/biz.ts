// 내 구독장소
export interface TsGetCharacters {
	characterId: number; // example: 1001 캐릭터ID
	faceColor: string; // example: c661dbae683e44419baa216e21be1308 얼굴(컬러)
	faceGray: string; // example: 283f93565e4d442cba687a802e6e1554 얼굴(흑백)
	fullColor: string; // example: c4d4e28b227a477eb73adb07ed02fd34	전신(컬러)
	fullGray: string; // example: 4d0bca74f85d4638a4a09b4e9e47c197 전신(흑백)
	head: string; // example: 5ff4b152427043c39a1bbde608fe157b
	isAdmin: string[]; // example: [ N ] 운영자여부
	minimumLevel: number; // example: 1	최소레벨
	webpMotion1: string; // example: 65c918f9c3c74b94b4b225698eb9b268
	webpMotion2: string; // example: 2b546d9e73f6404eaeacacce4d5a0025
}

//
export interface TsBBS {
	content: string; // 내용
	createDate: string; // example: 2018-01-01 12:00:00 등록일시
	createId: string; // example: 900000000000001 등록자
	endDate: string; // example: 2018-01-01 12:00:00 종료일
	headTitle: string; // 말머리
	importantEndDate: string; // example: 2018-01-01 12:00:00 상단노출종료일
	importantStartDate: string; // example: 2018-01-01 12:00:00	상단노출시작일
	isImportant: string[]; // example: [ Y ] 상단노출여부
	osType:	string[]; // example: [ ANDROID, IOS, ALL ] OS타입
	periodType: string; // example: [LIMITED, UNLIMITED] 노출기간타입
	startDate: string; // 시작일
	title: string; // 제목
	updateDate:	string; // 수정일시
	updateId: string; // 수정자
	versionFrom: string;  // example: 1.0.23 시작버전
	versionTo: string; // example: 1.0.23 종료버전
	viewCount: number; // example: 23 조회수
}

export interface Notice extends TsBBS {
	noticeId: number; // example: 3 공지사항ID
}

export interface Faq extends TsBBS {
	faqId: number; // example: 3 도움말ID
}
