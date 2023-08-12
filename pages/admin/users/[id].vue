<template>
	<div>
		<Head>
			<Title>Edit User {{ id }}</Title>
		</Head>
		<admin-header title="Edit users" />
		<user-form :id="id" @submitted="onSubmit" />
	</div>
</template>

<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitEdit } = useSubmit()
	//
	// Get user id
	//
	const route = useRoute()
	const id = ref(route.params.id)

	//
	// Users form action
	//
	const onSubmit = async function (form_state) {
		alert.clear()
		await onSubmitEdit('users', form_state)
		navigateTo('/admin/users')
	}
</script>
