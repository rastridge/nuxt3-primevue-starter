<script setup>
	const { onSubmitAdd } = useSubmit()
	//
	// Get content item id
	//
	const route = useRoute()
	const id = ref(route.params.id)

	//
	// content form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('contributions', form_state)
		navigateTo(`/admin/contributions`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add Contribution {{ id }}</Title>
		</Head>
		<admin-header title="Add Contribution" />
		<contributions-form :id="id" @submitted="onSubmit" />
	</div>
</template>
