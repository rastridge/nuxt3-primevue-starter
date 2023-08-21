<template>
	<div id="loginpage">
		<div v-if="alert.message" :class="`alert ${alert.type}`">
			{{ alert.message }}
		</div>

		<div
			v-if="!auth.isLoggedIn"
			class="surface-card p-4 shadow-2 border-round w-full lg:w-6"
		>
			<div class="text-center mb-5">
				<div class="text-900 md:text-2xl font-medium mb-3">
					Login Admin User
				</div>
			</div>
			<form>
				<div>
					<label for="username" class="block text-900 font-medium mb-2"
						>Username</label
					>
					<InputText
						id="username"
						type="text"
						v-model="username"
						class="w-full mb-3"
					/>

					<label for="password" class="block text-900 font-medium mb-2"
						>Password</label
					>
					<InputText
						id="password"
						type="password"
						v-model="password"
						class="w-full mb-3"
					/>

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
				</div>
			</form>
			<Button
				label="Log In"
				icon="pi pi-user"
				class="w-full"
				@click="handleSubmit"
			></Button>
		</div>
	</div>
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	import { useAlertStore } from '~/stores/alertStore'
	const auth = useAuthStore()
	const alert = useAlertStore() // used in template
	const username = ref('')
	const password = ref('')

	const keeploggedin = ref(false)
	const handleSubmit = async () => {
		console.log(username.value + password.value + keeploggedin.value)
		if (username.value && password.value) {
			auth.login(username.value, password.value, keeploggedin.value) // pinia auth store
		}
	}
</script>
