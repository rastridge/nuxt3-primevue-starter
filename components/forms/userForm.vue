<template>
	<div>
		<p v-if="!apps_data"><ProgressSpinner /> Loading</p>
		<div v-else>
			<div>
				<Button
					class="p-button mb-4"
					style="display: block; margin-left: auto; margin-right: auto"
					label="Submit user"
					@click="submitForm(state)"
				>
				</Button>
				<Button
					class="p-button mb-4"
					label="Cancel"
					style="display: block; margin-left: auto; margin-right: auto"
					@click="cancelForm"
				>
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
						ERROR: {{ alert.message }}
					</p>
					<label for="admin_user_name">Username</label>
					<InputText
						id="admin_user_name"
						type="text"
						v-model.trim="state.admin_user_name"
						class="w-full"
					/>
					<p v-if="username_required" class="alert-danger">Required</p>
					<label for="admin_user_email">Email</label>
					<InputText
						id="admin_user_email"
						type="email"
						v-model.trim="state.admin_user_email"
						class="w-full"
					/>
					<p v-if="email_required" class="alert-danger">Required</p>
					<div v-if="!addForm">
						<Checkbox v-model="reset" :binary="true" />
						<label> Change password</label>
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
						<p v-if="password_required" class="alert-danger">Required</p>
						<label for="repeatPass">Repeat Password:</label>
						<InputText
							id="repeatPass"
							type="password"
							v-model.trim="repeatPass"
							class="w-full"
						/>
						<p v-if="!match" class="alert-danger">No match</p>
					</div>
					<p v-if="alert.message" class="alert-danger">
						ERROR: {{ alert.message }}
					</p>
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
									<div>
										<input
											type="radio"
											v-model="state.perms[index].admin_perm"
											value="3"
										/>
									</div>
								</td>
								<td>
									<div>
										<input
											type="radio"
											v-model="state.perms[index].admin_perm"
											value="2"
										/>
									</div>
								</td>
								<td>
									<div>
										<input
											type="radio"
											v-model="state.perms[index].admin_perm"
											value="1"
										/>
									</div>
								</td>
								<td>
									<div>
										<input
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
				<Button
					class="p-button m-4 center"
					label="Submit user"
					@click="submitForm(state)"
				>
				</Button>
				<Button class="p-button center" label="Cancel" @click="cancelForm">
				</Button>
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
	const state = ref({})
	//
	// password change input
	//
	const reset = ref(false)
	const repeatPass = ref('')
	const resetPassword = () => {
		reset.value = !reset.value
	}

	//
	// Input validations
	//
	const match = computed(() => state.value.password === repeatPass.value)
	const password_required = computed(() => state.value.password === '')
	const username_required = computed(() => state.value.admin_user_name === '')
	const email_required = computed(() => state.value.admin_user_email === '')

	//
	// get app names for access perms
	//
	const { data: apps_data } = await useFetch(`/users/getapps`, {
		method: 'get',
		headers: {
			authorization: auth.user.token,
		},
	})

	//
	// Are we Adding or editing?
	//
	const addForm = props.id === 0
	if (addForm) {
		// Init perms for add
		//
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
		//
		// Initialize state for add
		//
		state.value = {
			admin_user_id: '',
			admin_user_name: '',
			admin_user_email: '',
			password: '',
			perms: permsArray.value,
		}
	} else {
		// get user data for editing
		const { data: form_data } = await useFetch(`/users/${props.id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		state.value = form_data.value
		state.value.password = ''
	}

	const submitForm = (form) => {
		let ok = false
		if (
			!reset.value &&
			!addForm &&
			!username_required.value &&
			!email_required.value
		) {
			ok = true
		}
		if (
			(reset.value || addForm) &&
			!username_required.value &&
			!email_required.value &&
			!password_required.value &&
			match.value
		) {
			ok = true
		}
		if (ok) {
			emit('submitted', form)
		} else {
			alert.error('Incomplete form')
		}
	}
	const cancelForm = () => {
		navigateTo('/admin/users')
	}
</script>
