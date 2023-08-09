<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	//
	// Accounts form action
	//
	const onSubmit = async function (form_state) {
		alert.clear()
		await onSubmitAdd('accounts', form_state)
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
		<accounts-form @submitted="onSubmit" />
	</div>
</template>
