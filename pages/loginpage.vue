<template>
	<div id="loginpage">
		<div v-if="alert.message" :class="`alert ${alert.type}`">
			{{ alert.message }}
		</div>
		<!-- 		<div class="formgrid grid">
			<div class="field">
				<label for="firstname1">Firstname</label>
				<input
					id="firstname1"
					type="text"
					class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
				/>
			</div>
			<div class="field">
				<label for="lastname1">Lastname</label>
				<input
					id="lastname1"
					type="password"
					class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
				/>
			</div>
		</div>
 -->
		<div v-if="!auth.isLoggedIn" class="card">
			<h3>Login Admin Users</h3>

			<FormKit type="form" submit_label="Login" @submit="handleSubmit">
				<FormKit
					type="text"
					name="username"
					label="Username"
					validate="required|length:5"
				>
				</FormKit>
				<!-- password = {{ password }}
				<Password v-model="password" toggleMask :feedback="false" /> -->
				<FormKit
					type="password"
					name="password"
					label="Password"
					validate="required|length:5"
					suffix-icon="eyeClosed"
					@suffix-icon-click="handleIconClick"
				>
				</FormKit>

				<div class="mb-4">
					<Checkbox v-model="keeploggedin" :binary="true" />
					<label> Keep me logged in</label>
				</div>
			</FormKit>
			<div>
				<nuxt-link to="/resetpassword" active-class="active"
					><a>Forgot password?</a></nuxt-link
				>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	import { useAlertStore } from '~/stores/alertStore'
	const auth = useAuthStore()
	const alert = useAlertStore() // used in template
	// const password = ref('')

	const handleIconClick = (node, e) => {
		node.props.suffixIcon =
			node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
		node.props.type = node.props.type === 'password' ? 'text' : 'password'
	}
	const keeploggedin = ref(false)
	const handleSubmit = async (state) => {
		// state.password = password.value
		// console.log(state.username + state.password + password.value)
		if (state.username && state.password) {
			auth.login(state.username, state.password, keeploggedin) // pinia auth store
		}
	}
</script>

<style>
	.formkit-suffix-icon:hover {
		color: var(--fk-color-primary);
	}
</style>
