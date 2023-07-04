<script setup>
	import { useMenuStore } from '@/stores'
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
	const menuStore = useMenuStore()

	useHead({
		title: 'Nuxt 3 PrimeVue Starter',
	})

	await menuStore.initCustomMenuItems()

	// stay logged in?
	if (!localStorage.getItem('auth')) {
		navigateTo('/')
	} else {
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
