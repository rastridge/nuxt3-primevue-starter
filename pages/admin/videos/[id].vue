<script setup>
	const { onSubmitEdit } = useSubmit()

	//
	// Get video id
	//
	const route = useRoute()
	const id = ref(route.params.id)
	//
	// Videos form action
	//
	const onSubmit = async function (state) {
		await onSubmitEdit('videos', state)
		navigateTo(`/admin/videos`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit Video {{ id }}</Title>
		</Head>
		<common-header title="Edit Video" />
		<videos-form :id="id" @submitted="onSubmit" />
	</div>
</template>
