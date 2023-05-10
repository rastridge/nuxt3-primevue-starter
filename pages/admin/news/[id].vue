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
	const onSubmit = function (form_state) {
		onSubmitEdit('news', form_state)
		navigateTo(`/admin/news`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit News Item {{ id }}</Title>
		</Head>
		<common-header title="Edit News Item" />
		<news-form :id="id" @submitted="onSubmit" />
	</div>
</template>
