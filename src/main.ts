import Vue from 'vue'
import VuexSaga from 'vuex-saga'
import App from '@/App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import store from '@/store'
import router from '@/common/router'
import axiosMap from '@/service/axiosMap'
Vue.prototype.$axios = axiosMap;

Vue.config.productionTip = false

Vue.use(VuexSaga, { store })
Vue.use(Vuetify)


//const MYUID = '108100000001923'

const APP = new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');

