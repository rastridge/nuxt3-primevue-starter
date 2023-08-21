<script setup>
	import { useMenuStore } from '@/stores'
	import { useAuthStore } from '~/stores/authStore'
	import '@formkit/themes/genesis'
	const auth = useAuthStore()
	const menuStore = useMenuStore()

	useHead({
		title: 'Nuxt 3 Buffalo Rugby',
	})

	//
	// get custom menu items
	await menuStore.initCustomMenuItems()

	// stay logged in?
	if (localStorage.getItem('auth')) {
		auth.loginAuto()
	}
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style lang="scss">
	@import 'App.scss';
</style>
