import { put } from "vuex-saga";
let popTimer;
const actions = {
    ALERT: ({ commit }, payload) => {
        commit('ALERT_OPEN', payload);
        if (popTimer) {
            clearTimeout(popTimer);
        }
        popTimer = setTimeout(() => {
            commit('ALERT_CLOSE');
        }, 3000);
    },
    *WAIT() {
        yield put('WAIT');
    },
    *SUCCESS() {
        yield put('SUCCESS');
    }
};
export default actions;
//# sourceMappingURL=actions.js.map