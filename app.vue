<script setup>
	import { useMenuStore } from '@/stores'
	import nuxtStorage from 'nuxt-storage'
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
	const menuStore = useMenuStore()

	useHead({
		title: 'Nuxt 3 PrimeVue Starter',
	})

	// onMounted(async () => {
	await menuStore.initCustomMenuItems()

	if (!nuxtStorage.localStorage.getData('auth')) {
		navigateTo('/')
	} else {
		auth.user = nuxtStorage.localStorage.getData('auth')
		auth.status = { loggedIn: true }
		sessionStorage.setItem('auth', JSON.stringify(auth.user))
		navigateTo('/admin')
	} /*   */

	// })
	/* 	onMounted(async () => {
		const {
			data: menu_data,
			pending,
			error,
			refresh,
		} = await useFetch(`/content/custommenuitems`, {
			method: 'get',
			headers: {
				authorization: 'not-needed',
			},
		})
		let custommenuitems = []

		menu_data.value.forEach((element) => {
			custommenuitems.push({
				label: `${element.content_name}`,
				icon: 'pi pi-fw pi-bookmark',
				to: `/content/${element.content_id}`,
				visible: () => !auth.isLoggedIn,
			})
		})
		sessionStorage.setItem('custommenu', JSON.stringify(custommenuitems))
	}) */
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style lang="scss">
	@import 'App.scss';
</style>
