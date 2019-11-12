import Vue from 'vue';
import axios from 'axios';
const instance = axios.create({
    timeout: 5000,
});
instance.interceptors.response.use((response) => {
    const { data = {} } = response;
    if (response.status === 200) {
        delete data.status;
        delete data.message;
        return data;
    }
    else {
        return null;
    }
}, (error) => {
    $axios.$emit('error', error.response.data);
    return false;
});
const $axios = new Vue({
    data: {
        instance,
    },
    methods: {
        get(url, params) {
            return this.instance.get(url, params);
        },
        post(url, params) {
            return this.instance.post(url, params);
        },
        put(url, params) {
            return this.instance.put(url, params);
        },
        delete(url, params) {
            return this.instance.delete(url, { data: params });
        },
    },
});
export default $axios;
//# sourceMappingURL=axiosClient.js.map