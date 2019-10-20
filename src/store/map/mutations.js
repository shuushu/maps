const mutations = {
    // 나의구독리스트 > POI 정보
    MY_WISH: (state, payload) => {
        state.myWish = payload;
    },
    MY_CHECK: (state, payload) => {
        state.myCheck = payload;
    },
    MY_FRIEND: (state, payload) => {
        state.myFriend = payload;
    },
    // 나의 구독리스트 > 친구 정보
    GET_FRIEND: (state, payload) => {
        state.subdescMember = payload;
    },
    GET_WISH(state, payload) {
        state.wishList = payload;
    },
    RECOMMEND_SUBDESC(state, payload) {
        state.recommend = payload.content;
    },
    GET_DETAIL(state, payload) {
        state.detail = payload;
    },
    GET_REVIEW(state, payload) {
        state.reviewList = payload;
    },
};
export default mutations;
//# sourceMappingURL=mutations.js.map