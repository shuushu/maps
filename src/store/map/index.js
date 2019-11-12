import actions from './actions';
import mutations from './mutations';
export const state = {
    wishList: {
        content: [],
    },
    detail: {
        info: {},
        more: [],
        summary: {
            goodCount: 2,
            greatCount: 0,
            photoCount: 0,
            photos: [],
            poiId: 8652003,
            poorCount: 0,
            reviewAverage: {},
            reviewCount: 4,
            sosoCount: 2,
            tags: [],
        },
    },
    reviewList: {
        content: [],
    },
    recommend: [],
    subdescMember: [],
    myWish: [],
    myCheck: [],
    myFriend: [],
};
export const map = {
    namespaced: true,
    state,
    mutations,
    actions,
};
//# sourceMappingURL=index.js.map