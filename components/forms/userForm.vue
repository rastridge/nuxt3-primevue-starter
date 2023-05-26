<template>
	<div>
		<div v-if="!apps_data" class="spinner-border text-primary" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
		<div v-else>
			<div>
				<Button
					class="p-button-sm mb-4"
					style="display: block; margin-left: auto; margin-right: auto"
					@click="submitForm(state)"
				>
					Submit
				</Button>

				<div
					style="
						display: block;
						width: 340px;
						margin-left: auto;
						margin-right: auto;
					"
				>
					<p v-if="alert.message" class="alert-danger">
						ERROR{{ alert.message }}
					</p>
					<label for="admin_user_name">Username</label>
					<InputText
						id="admin_user_name"
						type="text"
						v-model.trim="state.admin_user_name"
						class="w-full"
					/>

					<label for="admin_user_email">Email</label>
					<InputText
						id="admin_user_email"
						type="email"
						v-model.trim="state.admin_user_email"
						class="w-full"
					/>

					<div v-if="!addForm" class="form-check">
						<input
							id="reset"
							v-model="reset"
							type="checkbox"
							class="form-check-input"
							@input="resetPassword()"
						/>
						<label class="form-check-label" for="reset">Change password</label>
					</div>
					<br />

					<div v-if="reset || addForm">
						<label for="password">New Password:</label>
						<InputText
							id="password"
							type="password"
							v-model.trim="state.password"
							class="w-full"
						/>

						<label for="repeatPass">Repeat Password:</label>
						<InputText
							id="repeatPass"
							type="password"
							v-model.trim="state.repeatPass"
							class="w-full"
						/>
					</div>
				</div>
				<div class="m-5 text-xl text-center">Admin User Permissions</div>
				<div
					style="
						white-space: nowrap;
						display: block;
						width: 400px;
						margin-left: auto;
						margin-right: auto;
					"
				>
					<table>
						<thead>
							<tr>
								<th class="text-right">Application</th>
								<th>Manage</th>
								<th>Create</th>
								<th>View</th>
								<th>No access</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in apps_data" :key="item.admin_app_id">
								<td class="text-end">{{ item.admin_app_name }}:</td>
								<td>
									<div class="form-check">
										<input
											class="form-check-input"
											type="radio"
											v-model="state.perms[index].admin_perm"
											value="3"
										/>
									</div>
								</td>
								<td>
									<div class="form-check">
										<input
											class="form-check-input"
											type="radio"
											v-model="state.perms[index].admin_perm"
											value="2"
										/>
									</div>
								</td>
								<td>
									<div class="form-check">
										<input
											class="form-check-input"
											type="radio"
											v-model="state.perms[index].admin_perm"
											value="1"
										/>
									</div>
								</td>
								<td>
									<div class="form-check">
										<input
											class="form-check-input"
											type="radio"
											v-model="state.perms[index].admin_perm"
											value="0"
										/>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div>
					<Button
						class="m-1"
						style="display: block; margin-left: auto; margin-right: auto"
						@click="cancelForm"
					>
						Cancel </Button
					><br />
					<Button
						@click="submitForm(state)"
						style="display: block; margin-left: auto; margin-right: auto"
					>
						Submit
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	import { useAlertStore } from '~/stores/alertStore'
	const auth = useAuthStore()
	const alert = useAlertStore()

	//
	// Incoming
	//
	const props = defineProps({
		id: { Number, default: 0 },
	})

	//
	// outgoing
	//
	const emit = defineEmits(['submitted'])

	//
	// password input
	//
	const reset = ref(false)
	const repeatPass = ref('')
	const resetPassword = () => {
		reset.value = !reset
		if (reset.value) {
			state.password = ''
			repeatPass.value = ''
		}
	}
	const match = computed(() => state.password !== repeatPass.value)
	const required = computed(() => state.password === '')
	//
	// Required input tests
	const username_required = computed(() => state.admin_user_name === '')
	const email_required = computed(() => state.admin_user_email === '')

	// get app names for access perms
	const { data: apps_data } = await useFetch(`/users/getapps`, {
		method: 'get',
		headers: {
			authorization: auth.user.token,
		},
	})

	//
	// Add or edit?
	const addForm = props.id === 0

	//
	// Initialize form
	//
	// get init perms
	/* 	const { data: initperms } = await useFetch('/users/initperms', {
		method: 'get',
		headers: {
			authorization: auth.user.token,
		},
	})
 */
	const permsArray = ref([])
	apps_data.value.forEach((i) => {
		permsArray.value.push({
			admin_perm_id: 0,
			admin_app_id: i.admin_app_id,
			admin_app_name: i.admin_app_name,
			admin_perm: 0,
			admin_user_id: 0,
		})
	})

	let state = reactive({
		admin_user_id: '',
		admin_user_name: '',
		admin_user_email: '',
		admin_user_pass: '',
		password: '',
		perms: permsArray.value,
	})
	// users id exists - get user data
	if (!addForm) {
		// get user data
		const { data: form_data } = await useFetch(`/users/${props.id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		// console.log('form_data= ', form_data)

		// init from existing values if editing

		state = form_data.value
		state.password = ''
	}
	//
	// form handlers
	//
	const submitForm = (state) => {
		emit('submitted', state)
	}
	const cancelForm = () => {
		navigateTo('/admin/users')
	}
</script>

<style scoped>
	.alert-danger {
		color: red;
	}
	.xcentered {
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
</style>
