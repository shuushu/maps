import $axios from '@/service/axiosMap';
import { put, call } from 'vuex-saga';
const actions = {
    *GET_MEMBER_INFO({}, params) {
        try {
        }
        catch (e) {
            return false;
        }
    },
    // 내 장소보기
    *GET_MYPLACE({}, params) {
        try {
            const recom = yield call($axios.getMyPoi, params);
            if (params.type === 'MYWISH') {
                yield put('map/MY_WISH', recom);
            }
            else if (params.type === 'MYCHECK') {
                yield put('map/MY_CHECK', recom);
            }
            else {
                yield put('map/MY_FRIEND', recom);
            }
            return recom;
        }
        catch (e) {
            return false;
        }
    },
    // 추천받기
    *GET_RECOMMEND() {
        try {
            yield put('WAIT');
            const recom = yield call($axios.recommendation);
            yield put('SUCCESS');
            yield put('map/RECOMMEND_SUBDESC', recom);
        }
        catch (e) {
            yield put('FAIL');
        }
    },
    *GET_SUBSCRIPT({}, payload) {
        try {
            yield put('WAIT');
            const friend = yield call($axios.getSubScription, payload);
            if (!friend || friend.error) {
                throw friend.error || new Error();
            }
            //yield put('SUCCESS');
            yield put('map/GET_FRIEND', friend.subscriptionList);
            return friend;
        }
        catch (e) {
            yield put('FAIL');
        }
    },
    *GET_WISH({}, payload) {
        try {
            yield put('WAIT');
            let res = yield call($axios.getWish, payload);
            yield put('SUCCESS');
            // 가고싶어요 지도 레이어 스토어 저장
            yield put('map/GET_WISH', res);
            return res;
        }
        catch (e) {
            yield put('FAIL');
        }
    },
    *GET_DETAIL({}, payload) {
        try {
            yield put('WAIT');
            let res = yield call($axios.detailPOI, payload);
            let more = yield call($axios.detailPOImore, payload);
            let summary = yield call($axios.getDetailSummary, payload.poi);
            const result = {
                info: res,
                more: more,
                summary: summary
            };
            yield put('SUCCESS');
            yield put('map/GET_DETAIL', result);
            return result;
        }
        catch (e) {
            yield put('FAIL');
        }
    },
    *GET_REVIEWS({}, payload) {
        try {
            yield put('WAIT');
            let res = yield call($axios.getMyReviewList, { params: payload });
            yield put('SUCCESS');
            // 갔다왔어요 지도 레이어 스토어 저장
            let c = res.content.map((item) => {
                let { navWgs84Lon, navWgs84Lat } = item.poi;
                return { ...item.review, navWgs84Lon, navWgs84Lat };
            });
            yield put('map/GET_REVIEW', {
                total: res.totalPages,
                content: c
            });
            return res;
        }
        catch (e) {
            yield put('FAIL');
        }
    },
    *SAVE_WISH({}, payload) {
        try {
            yield put('WAIT');
            yield call($axios.addWish, payload);
            yield put('SUCCESS');
            return payload;
        }
        catch (e) {
            yield put('FAIL');
            return false;
        }
    },
    *REVIEW_LIKE({}, payload) {
        try {
            yield call($axios.reviewLike, payload);
            return payload;
        }
        catch (e) {
            yield put('FAIL');
        }
    },
    *REVIEW_LIKE_DELETE({}, payload) {
        try {
            yield call($axios.reviewLikeDel, payload);
            return payload;
        }
        catch (e) {
            yield put('FAIL');
        }
    },
    *REVIEW_LIKE_LIST({}, payload) {
        try {
            yield put('WAIT');
            const res = yield call($axios.reviewLikeList, payload);
            yield put('SUCCESS');
            return res;
        }
        catch (e) {
            yield put('FAIL');
        }
    },
    *GET_BOARD_LIST({}, payload) {
        try {
            yield put('WAIT');
            const res = yield call($axios.getBoardList, payload);
            yield put('SUCCESS');
            return res;
        }
        catch (e) {
            yield put('FAIL');
        }
    },
    *GET_BOARD_DETAIL({}, payload) {
        try {
            yield put('WAIT');
            const res = yield call($axios.getBoardDetail, payload);
            yield put('SUCCESS');
            return res;
        }
        catch (e) {
            yield put('FAIL');
        }
    }
};
export default actions;
//# sourceMappingURL=actions.js.map