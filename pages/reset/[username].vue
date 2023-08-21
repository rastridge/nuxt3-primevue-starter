<template>
	<div>
		username {{ username }}
		<FormKit
			type="form"
			id="password_reset"
			submit-label="Reset"
			@submit="submitHandler"
		>
			<FormKit
				type="password"
				name="password"
				label="Password"
				validation="required|length:8"
				validation-visibility="live"
				:validation-messages="{
					matches: 'Must be at leat 8 characters',
				}"
			/>
			<FormKit
				type="password"
				name="password_confirm"
				label="Confirm password"
				validation="required|confirm"
				validation-visibility="live"
				validation-label="Confirmation"
			/>
			<pre wrap>password= {{ password }}</pre>
			<pre wrap>username= {{ username }}</pre>
		</FormKit>
	</div>
</template>

<script setup>
	const route = useRoute()

	const username = ref(route.params.username)

	const submitHandler = async (state) => {
		const username = state.username
		const password = state.password
		const { data, error } = await useFetch('/users/resetpassword', {
			method: 'POST',
			body: { username, password },
			headers: {
				authorization: 'not-needed',
			},
		})

		navigateTo('/loginpage')
	}
</script>
