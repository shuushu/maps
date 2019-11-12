import Vue from 'vue';

declare module 'vue/types/vue' {
	interface Vue {
		$axios: any,
		$mapbox: any,
		$run: any
	}
}