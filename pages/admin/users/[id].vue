<template>
	<div>
		<Head>
			<Title>Edit User {{ id }}</Title>
		</Head>
		<common-header title="Edit users" />
		<p v-if="saving" class="text-center text-2xl">
			<ProgressSpinner /> Saving ...
		</p>
		<user-form :id="id" @submitted="onSubmit" />
		<p v-if="saving" class="text-2xl"><ProgressSpinner /> Saving ...</p>
	</div>
</template>

<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitEdit } = useSubmit()
	const saving = ref(false)
	//
	// Get user id
	//
	const route = useRoute()
	const id = ref(route.params.id)

	//
	// Users form action
	//
	const onSubmit = async function (form_state) {
		saving.value = true
		await onSubmitEdit('users', form_state)
		saving.value = false
		navigateTo('/admin/users')
	}
</script>
