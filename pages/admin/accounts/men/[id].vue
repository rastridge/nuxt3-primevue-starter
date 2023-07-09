<script setup>
	import { useAlertStore } from '~/stores/alertStore'

	const alert = useAlertStore()
	const { onSubmitEdit } = useSubmit()
	const saving = ref(false)

	//
	// Get account id to edit
	//
	const route = useRoute()
	const id = ref(route.params.id)

	//
	// Accounts form action
	//
	const onSubmit = async function (form_state) {
		alert.clear()
		saving.value = true
		await onSubmitEdit('accounts', form_state)
		saving.value = false
		if (alert.message === null) {
			navigateTo(`/admin/accounts/men`)
		}
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit Account {{ id }}</Title>
		</Head>
		<common-header title="Edit account" />
		<p v-if="saving" class="text-center text-2xl">
			<ProgressSpinner /> Saving ...
		</p>
		<accounts-form :id="id" @submitted="onSubmit" />
		<p v-if="saving" class="text-2xl"><ProgressSpinner /> Saving ...</p>
	</div>
</template>
