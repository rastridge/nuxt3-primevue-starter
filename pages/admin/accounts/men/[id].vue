<script setup>
	import { useAlertStore } from '~/stores/alertStore'

	const alert = useAlertStore()
	const { onSubmitEdit } = useSubmit()

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
		await onSubmitEdit('accounts', form_state)
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
		<admin-header title="Edit account" />
		<accounts-form :id="id" @submitted="onSubmit" />
	</div>
</template>
