<template>
	<div>
		<p v-if="!apps_data"><ProgressSpinner /> Loading</p>
		<div
			v-else
			style="display: block; margin-left: auto; margin-right: auto"
			class="surface-card p-4 shadow-2 border-round w-full md:w-9"
		>
			<div class="text-center">
				<p v-if="saving" class="text-2xl"><ProgressSpinner /> Saving ...</p>
				<Button
					class="mb-4 mr-4"
					label="Submit user"
					@click="submitForm(state)"
				>
				</Button>

				<Button class="p-button mb-4" label="Cancel" @click="cancelForm">
				</Button>
			</div>
			<p v-if="alert.message" class="alert-danger">
				ERROR: {{ alert.message }}
			</p>
			<label for="admin_user_name" class="block text-900 font-medium mb-2"
				>Username</label
			>
			<InputText
				v-model="state.admin_user_name"
				id="admin_user_name"
				type="text"
				class="w-full mb-3"
				size="small"
			/>
			<p v-if="username_required" class="alert-danger">Required</p>

			<label for="admin_user_email" class="block text-900 font-medium mb-2"
				>Email</label
			>
			<InputText
				v-model="state.admin_user_email"
				id="admin_user_email"
				type="email"
				class="w-full mb-3"
				size="small"
			/>
			<p v-if="email_required" class="alert-danger">Required</p>

			<div v-if="!addForm">
				<label for="reset" class="block text-900 font-medium mb-2"
					>Change password</label
				>
				<Checkbox id="reset" v-model="reset" :binary="true" />
			</div>

			<div v-if="reset || addForm">
				<label for="password" class="block text-900 font-medium mb-2"
					>New Password:</label
				>
				<InputText
					v-model="state.password"
					id="password"
					type="password"
					class="w-full mb-3"
					size="small"
				/>

				<p v-if="password_required" class="alert-danger">Required</p>
				<label for="repeatPass" class="block text-900 font-medium mb-2"
					>Repeat Password:</label
				>
				<InputText
					v-model="repeatPass"
					id="repeatPass"
					type="password"
					class="w-full mb-3"
					size="small"
				/>
				<p v-if="!match" class="alert-danger">No match</p>
			</div>
			<p v-if="alert.message" class="alert-danger">
				ERROR: {{ alert.message }}
			</p>

			<div class="m-5 md:text-xl font-semibold text-center">
				Admin User Permissions
			</div>
			<div class="mb-3">
				<table
					style="margin-left: auto; margin-right: auto"
					class="text-xs md:text-sm"
				>
					<thead>
						<tr>
							<th class="text-right">Application</th>
							<th>Manage</th>
							<th>Create</th>
							<th>View</th>
							<th style="white-space: nowrap">No access</th>
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
			<div class="text-center">
				<p v-if="saving" class="text-2xl"><ProgressSpinner /> Saving ...</p>
				<Button
					class="p-button mb-4 mr-4"
					label="Submit user"
					@click="submitForm(state)"
				>
				</Button>

				<Button class="p-button mb-4" label="Cancel" @click="cancelForm">
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
	const saving = ref(false)

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
			saving.value = true

			emit('submitted', form)
		} else {
			alert.error('Incomplete form')
		}
	}
	const cancelForm = () => {
		navigateTo('/admin/users')
	}
</script>
