import Vue from 'vue';
import axiosMap from './axiosMap';
//Vue.prototype.$axios = axiosClient
const maps = new Vue({
    methods: {
        ...axiosMap,
    },
});
Vue.prototype.$axios = maps;
const MYUID = 108100000001798;
export default {
    maps,
    MYUID,
};
//# sourceMappingURL=index.js.map