<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	//
	// Events form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('events', form_state)
		navigateTo(`/admin/events`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add events Item</Title>
		</Head>
		<admin-header title="Add event" />
		<events-form @submitted="onSubmit" />
	</div>
</template>

<style scoped></style>
