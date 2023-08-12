<script setup>
	const { onSubmitAdd } = useSubmit()

	//
	// Content form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('content', form_state)
		navigateTo(`/admin/content`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add Custom page</Title>
		</Head>
		<admin-header title="Add Custom page" />
		<content-form @submitted="onSubmit" />
	</div>
</template>
