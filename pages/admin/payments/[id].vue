<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitEdit } = useSubmit()
	const saving = ref(false)

	//
	// Get news item id
	//
	const route = useRoute()
	const id = ref(route.params.id)

	//
	// News form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitEdit('payments', form_state)
		navigateTo(`/admin/payments`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit payment {{ id }}</Title>
		</Head>
		<admin-header title="Edit payment" />
		<payments-form :id="id" @submitted="onSubmit" />
	</div>
</template>
