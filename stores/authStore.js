import { defineStore } from 'pinia'
import { useAlertStore } from '~/stores/alertStore'
import nuxtStorage from 'nuxt-storage'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		status: { loggedIn: false },
		user: {},
		keep: { keeped: false },
	}),
	getters: {
		loggingIn: (state) => state.status.loggingIn,
		isLoggedIn: (state) => state.status.loggedIn,
		isKeeped: (state) => state.keep.keeped,
		// getToken: (state) => state.status.user.token,
		getUser: (state) => state.status.user,
	},

	actions: {
		navigate(p) {
			const router = useRouter()
			return navigateTo({
				path: p,
			})
		},

		async login(username, password, keeploggedin) {
			this.loginRequest(username, password, keeploggedin)
		},

		async loginRequest(username, password, keeploggedin) {
			// nuxtStorage.localStorage.removeItem('user')
			// nuxtStorage.localStorage.removeItem('status')

			const alert = useAlertStore()
			this.status = { loggedIn: false }
			alert.attempt('Logging in . . .')
			const user = await $fetch('/users/authenticate', {
				headers: {
					authorization: 'not-needed',
				},
				method: 'POST',
				body: { username, password },
			})
			if (user.match) {
				this.user = user
				this.loginSuccess(user, keeploggedin)
			} else {
				this.loginFailure()
			}
		},
		loginSuccess(user, keeploggedin) {
			this.status = { loggedIn: true }
			this.user = user
			this.keep = { keeped: keeploggedin }
			sessionStorage.removeItem('auth')
			// nuxtStorage.sessionStorage.removeItem('auth')
			// nuxtStorage.sessionStorage.removeItem('auth')
			nuxtStorage.sessionStorage.setData('auth2', user)
			sessionStorage.setItem('auth', JSON.stringify(user))

			// if (keeploggedin) {
			if (this.keep.keeped) {
				console.log('keeploggedin ', keeploggedin)
				nuxtStorage.localStorage.setData('auth', user, 1, 'h')
			}
			const alert = useAlertStore()
			alert.success('Login successful')
			navigateTo('/admin')
		},

		logout() {
			const alert = useAlertStore()
			alert.clear()
			this.status = { loggedIn: false }
			this.keep = { isKeeped: false }
			this.user = {}
			// nuxtStorage.sessionStorage.removeItem('auth')
			sessionStorage.removeItem('auth')
			// c.removeItem('auth')
			navigateTo('/')
		},

		loginFailure() {
			this.status = { loggedIn: false }
			this.keep = { keeped: false }
			this.user = {}
			const alert = useAlertStore()
			alert.error('Login failed - try again')
			navigateTo('/loginpage')
		},
	},
})
