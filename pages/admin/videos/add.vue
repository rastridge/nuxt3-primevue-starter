<script setup>
	const { onSubmitAdd } = useSubmit()

	// Opponents form action
	//
	const onSubmit = async function (state) {
		await onSubmitAdd('videos', state)
		navigateTo(`/admin/videos`)
	}
</script>

<template>
	<div>
		<Head>
			<Title> Add Video</Title>
		</Head>
		<common-header title="Add Video" />
		<videos-form @submitted="onSubmit" />
	</div>
</template>
