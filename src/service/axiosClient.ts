import Vue from 'vue'
import axios from 'axios'

const instance = axios.create({
	timeout: 5000
})


instance.interceptors.response.use((response: any) => {
	const { data = {} } = response
	if (response.status === 200) {
		delete data.status
		delete data.message

		return data
	} else {
		return null
	}
}, (error: any) => {
	return null
})

const $axios = new Vue({
  data: {
    instance,
  },
  methods: {
    get(url: string, params: any) {
      return this.instance.get(url, params)
    },
    post(url: string, params: any) {
      return this.instance.post(url, params)
    },
    put(url: string, params: any) {
      return this.instance.put(url, params)
    },
    delete(url: string, params: any) {
      return this.instance.delete(url, { data: params })
    },
  },
})

export default $axios
