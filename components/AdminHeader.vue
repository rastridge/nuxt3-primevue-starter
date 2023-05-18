<template>
	<div>
		<p>
			{{ title.charAt(0).toUpperCase() + title.slice(1) }}
		</p>
		<!-- <user-logged-in /> -->
	</div>
</template>

<script>
	// import UserLoggedIn from '@/components/presentation/UserLoggedIn'

	export default {
		props: {
			title: { type: String, default: '', required: true },
		},
	}
</script>
