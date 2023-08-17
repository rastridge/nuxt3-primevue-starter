// import { defineStore } from 'pinia'
export const useAlertStore = defineStore('adverts', {
	state: () => ({
		adverts: [],
	}),
	getters: {
		adverts: (state) => state.adverts,
	},

	actions: {
		set(ads) {
			this.adverts = ads
		},
		clear() {
			this.adverts = []
		},
	},
})
