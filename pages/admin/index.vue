<template>
	<div>
		<p>Admin user name is {{ auth.user.admin_user_name }}</p>
		<!-- <p>Admin user token is {{ auth.user.token }}</p> -->
		<p>Admin user is logged in {{ auth.isLoggedIn }}</p>

		<p>session Admin user name is {{ sess.admin_user_name }}</p>
		<!-- <p>session Admin user token is {{ sess.token }}</p> -->
		<p>auth Admin user is logged in {{ auth.isLoggedIn }}</p>
		<p>Keep me logged in {{ auth.isKeeped }}</p>
	</div>
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	import nuxtStorage from 'nuxt-storage'

	const auth = useAuthStore()
	// const sess = nuxtStorage.sessionStorage.getData('auth')
	const sess = JSON.parse(sessionStorage.getItem('auth'))
	// definePageMeta({
	// 	layout: 'admin',
	// })
</script>
