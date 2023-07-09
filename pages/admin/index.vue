<template>
	<div>
		<ProgressSpinner
			:pt="{
				spinner: { style: { animationDuration: '2s' } },
				circle: {
					style: { stroke: '#F59E0B', strokeWidth: 3, animation: 'none' },
				},
			}"
		/>
		<p>Admin user name is {{ auth.user.admin_user_name }}</p>
		<!-- <p>Admin user token is {{ auth.user.token }}</p> -->
		<p>Admin user is logged in {{ auth.isLoggedIn }}</p>

		<p>session Admin user name is {{ sess.admin_user_name }}</p>
		<!-- <p>session Admin user token is {{ sess.token }}</p> -->
		<p>auth Admin user is logged in {{ auth.isLoggedIn }}</p>
		<p>Keep me logged in is {{ auth.isKeeped }}</p>
		<p>placemark page is {{ placemark.getPage }}</p>
		<p>placemark alpha is {{ placemark.getAlpha }}</p>
		<p>placemark membertypeid is {{ placemark.getMemberTypeId }}</p>
		<p>placemark alpha is {{ placemark.getYear }}</p>
		<p>placemark gametypeid is {{ placemark.getGameTypeId }}</p>
		<p>placemark year is {{ placemark.year }}</p>
	</div>
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	import { usePlacemarkStore } from '@/stores'
	const placemark = usePlacemarkStore()
	const auth = useAuthStore()
	const sess = JSON.parse(sessionStorage.getItem('auth'))
</script>
