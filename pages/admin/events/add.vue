<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()
	const saving = ref(false)

	//
	// Events form action
	//
	const onSubmit = async function (form_state) {
		saving.value = true
		await onSubmitAdd('events', form_state)
		saving.value = false
		navigateTo(`/admin/events`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add events Item</Title>
		</Head>
		<common-header title="Add event" />
		<p v-if="saving" class="text-center text-2xl">
			<ProgressSpinner /> Saving ...
		</p>

		<events-form @submitted="onSubmit" />
		<p v-if="saving" class="text-center text-2xl">
			<ProgressSpinner /> Saving ...
		</p>
	</div>
</template>

<style scoped></style>
