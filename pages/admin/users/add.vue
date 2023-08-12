<template>
	<div>
		<Head>
			<Title>Add User</Title>
		</Head>
		<admin-header title="Add User" />
		<user-form @submitted="onSubmit" />
	</div>
</template>

<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	//
	// Users form action
	//
	const onSubmit = async function (form_state) {
		alert.clear()
		await onSubmitAdd('users', form_state)
		if (alert.message === null) {
			navigateTo('/admin/users')
		}
	}
</script>
