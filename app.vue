<script setup>
	import { useMenuStore } from '@/stores'
	const menuStore = useMenuStore()

	useHead({
		title: 'Nuxt 3 PrimeVue Starter',
	})

	// onMounted(async () => {
	await menuStore.initCustomMenuItems()
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
