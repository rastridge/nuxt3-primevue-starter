<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()
	const saving = ref(false)

	//
	// Accounts form action
	//
	const onSubmit = async function (form_state) {
		saving.value = true
		await onSubmitAdd('accounts', form_state)
		saving.value = true
		if (alert.message === null) {
			navigateTo(`/admin/accounts/men`)
		}
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add Account</Title>
		</Head>
		<common-header title="Add account" />
		<p v-if="saving" class="text-center text-2xl">
			<ProgressSpinner /> Saving ...
		</p>
		<accounts-form @submitted="onSubmit" />
		<p v-if="saving" class="text-center text-2xl">
			<ProgressSpinner /> Saving ...
		</p>
	</div>
</template>
