<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitEdit } = useSubmit()

	//
	// Get news item id
	//
	const route = useRoute()
	const id = ref(route.params.id)

	//
	// News form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitEdit('events', form_state)
		navigateTo(`/admin/events`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit event{{ id }}</Title>
		</Head>
		<admin-header title="Edit event" />
		<events-form :id="id" @submitted="onSubmit" />
	</div>
</template>
