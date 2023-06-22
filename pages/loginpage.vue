<template>
	<div id="loginpage">
		<div v-if="alert.message" :class="`alert ${alert.type}`">
			{{ alert.message }}
		</div>

		<div v-if="!auth.isLoggedIn" class="formroot">
			<h3 class="headline">Login Admin Users</h3>

			<FormKit type="form" submit_label="Login" @submit="handleSubmit">
				<FormKit
					type="text"
					name="username"
					label="Username"
					validate="required|length:5"
				>
				</FormKit>
				<FormKit
					type="password"
					name="password"
					label="Password"
					validate="required|length:5"
				>
				</FormKit>
				<FormKit
					type="checkbox"
					label="Keep me logged in"
					name="keeploggedin"
					:value="false"
				/>
				<!-- state.keeploggedin = {{ state.keeploggedin }} -->
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
	// import '@formkit/themes/genesis'

	import { useAuthStore } from '~/stores/authStore'
	import { useAlertStore } from '~/stores/alertStore'
	const auth = useAuthStore()
	const alert = useAlertStore() // used in template

	const handleSubmit = async (state) => {
		if (state.username && state.password) {
			auth.login(state.username, state.password, state.keeploggedin) // pinia auth store
		}
	}
</script>

<style scoped>
	.formroot {
		text-align: left;
		margin-left: 4rem;
	}
	[data-invalid] .formkit-inner {
		border-color: red;
		box-shadow: 0 0 0 1px red;
	}

	[data-complete] .formkit-inner {
		border-color: red;
		box-shadow: 0 0 0 1px green;
	}
	[data-complete] .formkit-inner::after {
		content: '✅';
		display: block;
		padding: 0.5em;
	}
</style>
