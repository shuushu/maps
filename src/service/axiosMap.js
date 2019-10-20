import $axios from './axiosClient';
export default {
    // 멤버 정보 가져오기
    getCharacters(params) {
        return $axios.get('/bizcommon/v1/characters', { params });
    },
    // 내 장소 보기/구독장소 표시
    getMyPoi(params) {
        return $axios.get('/map/v1/main/search', { params });
    },
    // [타인]내 장소 보기/구독장소 표시
    getDescriptPoi(data) {
        const { targetCmn, params } = data;
        return $axios.get(`/map/v1/main/search/${targetCmn}`, { params });
    },
    reversegeocoding(params) {
        return $axios.get('/map/v1/tmap/geo/reversegeocoding', params);
    },
    // POI상세
    detailPOI(params) {
        const { poi } = params;
        return $axios.get(`/map/v1/pois/${poi}`, params);
    },
    // POI 상세속성조회(더보기)
    detailPOImore(params) {
        const { poi } = params;
        return $axios.get(`/map/v1/pois/${poi}/attr`, params);
    },
    // 상세
    clickPoiDetail(params) {
        const { poi, navSeq } = params;
        return $axios.get(`/map/v1/pois/${poi}/navseqs/${navSeq}`, params);
    },
    // 상세 > 기타정보(포토, 태그, 별점)
    getDetailSummary(poiId) {
        return $axios.get(`/map/v1/pois/${poiId}/summary/`, poiId);
    },
    /*
     * 가고싶어요 wish
     */
    //  목록
    getWish(data) {
        if (data.targetCmn) {
            return $axios.get(`/map/v1/wishes/${data.targetCmn}`, {
                params: {
                    data,
                    'x-skcomms-cmn': data.targetCmn
                }
            });
        }
        else {
            return $axios.get(`/map/v1/wishes`, data);
        }
    },
    // 등록
    addWish(poi) {
        return $axios.post(`/map/v1/wishes/${poi}`, {
            poiId: poi
        });
    },
    // 삭제
    deleteWish(poi) {
        return $axios.delete(`/map/v1/wishes/${poi}`, {
            poiId: poi
        });
    },
    /*
     * 구독
     */
    // 추천리스트
    getRecommendation(params) {
        return $axios.get(`/map/v1/wishes`, params);
    },
    // 신청
    joinSubscript(cmn) {
        return $axios.post(`/user/v1/subscription`, {
            friendCmn: cmn
        });
    },
    // 멤버 가져오기
    getSubScription(params) {
        return $axios.get('/user/v1/subscription', params);
    },
    // 즐겨찾기 수정
    setSubscript(params) {
        return $axios.put(`/user/v1/subscription/interest`, params);
    },
    // 취소하기
    deleteSubscript(friendCmn) {
        return $axios.delete(`/user/v1/subscription/${friendCmn}`, friendCmn);
    },
    // 추천받기 - 전문가
    recommendation(params) {
        return $axios.get(`/user/v1/subscription/recommendation/specialist`, params);
    },
    // 타인 프로필 정보 조회
    getUserInfo(targetCmn) {
        return $axios.get(`/user/v1/user/profile/${targetCmn}`, targetCmn);
    },
    // 갔다왔어요
    // 목록
    getMyReviewList(data) {
        if (data.params.targetCmn) {
            return $axios.get(`/map/v1/reviews/${data.params.targetCmn}`, data);
        }
        else {
            return $axios.get(`/map/v1/reviews`, data);
        }
    },
    // 리뷰 좋아요
    reviewLike(data) {
        const { poiId, reviewId } = data;
        return $axios.post(`/map/v1/pois/${poiId}/reviews/${reviewId}/like`, data);
    },
    // 리뷰 좋아요 취소
    reviewLikeDel(data) {
        const { poiId, reviewId } = data;
        return $axios.delete(`/map/v1/pois/${poiId}/reviews/${reviewId}/like`, data);
    },
    // 리뷰 좋아요 사용자 리스트
    reviewLikeList(data) {
        const { poiId, reviewId } = data;
        return $axios.get(`/map/v1/pois/${poiId}/reviews/${reviewId}/likes`, data);
    },
    // 공지사항
    getBoardList(data) {
        const { boardName, osType } = data;
        return $axios.get(`/bizcommon/v1/${boardName}?osType=${osType}`, data);
    },
    getBoardDetail(data) {
        const { boardName, id } = data;
        return $axios.get(`/bizcommon/v1/${boardName}/${id}`, data);
    }
};
//# sourceMappingURL=axiosMap.js.map