<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	//
	// payments form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('payments', form_state)
		navigateTo(`/admin/payments`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add payment</Title>
		</Head>
		<admin-header title="Add payment" />
		<payments-form @submitted="onSubmit" />
	</div>
</template>
