const mutations = {
    ALERT_OPEN(state, payload) {
        state.isAlert = { ...payload, show: true };
    },
    ALERT_CLOSE(state) {
        state.isAlert.show = false;
    },
    WAIT(state) {
        state.isLoading = true;
    },
    SUCCESS(state) {
        state.isLoading = false;
    },
    FAIL(state) {
        state.isLoading = false;
    },
    SET_CONFIRM(state, payload) {
        state.confirm = payload;
    },
    SET_CHARACTER(state, payload) {
        state.characters = payload;
    },
    MY_COLLECTIONS(state, payload) {
        state.myCollections = payload;
    },
};
export default mutations;
//# sourceMappingURL=mutations.js.map