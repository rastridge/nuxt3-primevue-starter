<script setup>
	const { onSubmitEdit } = useSubmit()
	//
	// Get content item id
	//
	const route = useRoute()
	const id = ref(route.params.id)

	//
	// content form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitEdit('contributions', form_state)
		navigateTo(`/admin/contributions`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit Contributions {{ id }}</Title>
		</Head>
		<admin-header title="Edit Contributions" />
		<contributions-form :id="id" @submitted="onSubmit" />
	</div>
</template>
