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
	const onSubmit = function (form_state) {
		onSubmitAdd('contributions', form_state)
		navigateTo(`/admin/contributions`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add Contribution {{ id }}</Title>
		</Head>
		<common-header title="Add Contribution" />
		<contributions-form :id="id" @submitted="onSubmit" />
	</div>
</template>
