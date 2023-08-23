<template>
	<div id="loginpage">
		<div v-if="alert.message" :class="`alert ${alert.type}`">
			{{ alert.message }}
		</div>
		<div
			v-if="!auth.isLoggedIn"
			class="surface-card p-4 shadow-2 border-round w-full lg:w-7"
		>
			<div class="text-center mb-5">
				<div class="text-900 md:text-2xl font-medium mb-3">
					Login Admin User
				</div>
			</div>
			<FormKit type="form" submit-label="Login" @submit="handleSubmit">
				<FormKit
					type="text"
					name="username"
					label="Username"
					validation="required|length:3"
					validation-visibility="live"
					:validation-messages="{
						matches: 'Username must be at least 3 chars',
					}"
				>
				</FormKit>

				<FormKit
					type="password"
					name="password"
					label="Password"
					validation="required|length:5"
					validation-visibility="live"
					:validation-messages="{
						matches: 'Password must be at least 5 chars',
					}"
				>
				</FormKit>

				<div class="flex align-items-center justify-content-between mb-6">
					<div class="flex align-items-center">
						<Checkbox
							id="rememberme1"
							:binary="true"
							v-model="keeploggedin"
							class="mr-2"
						></Checkbox>
						<label for="rememberme1">Keep me logged in</label>
					</div>

					<nuxt-link
						to="/resetpassword"
						class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
						active-class="active"
						><a>Forgot password?</a></nuxt-link
					>
				</div>
			</FormKit>
			<Button label="Cancel" class="w-50" @click="cancelForm()"></Button>
		</div>
	</div>
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	import { useAlertStore } from '~/stores/alertStore'
	const auth = useAuthStore()
	const alert = useAlertStore() // used in template

	const keeploggedin = ref(false)

	const cancelForm = () => {
		navigateTo('/')
	}
	const handleSubmit = async (state) => {
		console.log(state.username + state.password + keeploggedin.value)
		if (state.username && state.password) {
			auth.login(state.username, state.password, keeploggedin.value) // pinia auth store
		}
	}
</script>
