import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import { map } from './map';
Vue.use(Vuex);
const state = {
    isAlert: {
        color: 'red',
        icon: 'warning',
        show: false,
        msg: null,
    },
    isLoading: false,
    confirm: {
        flag: false,
        template: 'nodata',
        title: 'confirm Title',
        func: () => {
            console.log('function object');
        }
    },
    characters: [],
    myCollections: {}
};
const store = {
    state,
    actions,
    mutations,
    modules: {
        map,
    },
};
export default new Vuex.Store(store);
//# sourceMappingURL=index.js.map