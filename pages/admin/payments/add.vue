<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()
	const saving = ref(false)

	//
	// payments form action
	//
	const onSubmit = async function (form_state) {
		saving.value = true
		await onSubmitAdd('payments', form_state)
		saving.value = false
		navigateTo(`/admin/payments`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add payment</Title>
		</Head>
		<common-header title="Add payment" />
		<p v-if="saving" class="text-center text-2xl">
			<ProgressSpinner /> Saving ...
		</p>

		<payments-form @submitted="onSubmit" />
		<p v-if="saving" class="text-center text-2xl">
			<ProgressSpinner /> Saving ...
		</p>
	</div>
</template>
