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
		await onSubmitEdit('content', form_state)
		navigateTo(`/admin/content`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit custom page {{ id }}</Title>
		</Head>
		<admin-header title="Edit custom page" />
		<content-form :id="id" @submitted="onSubmit" />
	</div>
</template>
