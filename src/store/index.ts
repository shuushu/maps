import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { rootState } from '@/ts.interface/store.ts'
import actions from './actions'
import mutations from './mutations'

import { map } from './map'

Vue.use(Vuex)

const state: rootState = {
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
            console.log('function object')
        }
    },
	characters: [],
	myCollections: {}
}

const store: StoreOptions<rootState> = {
    state,
    actions,
    mutations,
    modules: {
        map,
    },
}

export default new Vuex.Store<rootState>(store)
