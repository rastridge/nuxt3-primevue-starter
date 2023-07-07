<template>
	<div>
		<Head>
			<Title>Add User</Title>
		</Head>
		<common-header title="Add User" />
		<p v-if="saving" class="text-center text-2xl">
			<ProgressSpinner /> Saving ...
		</p>
		<user-form @submitted="onSubmit" />
		<p v-if="saving" class="text-2xl"><ProgressSpinner /> Saving ...</p>
	</div>
</template>

<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	const saving = ref(false)

	//
	// Users form action
	//
	const onSubmit = async function (form_state) {
		saving.value = true
		await onSubmitAdd('users', form_state)
		saving.value = false
		if (alert.message === null) {
			navigateTo('/admin/users')
		}
	}
</script>
