<script setup>
	const { onSubmitAdd } = useSubmit()

	//
	// Content form action
	//
	const onSubmit = function (form_state) {
		onSubmitAdd('content', form_state)
		navigateTo(`/admin/content`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add Custom page</Title>
		</Head>
		<common-header title="Add Custom page" />
		<content-form @submitted="onSubmit" />
	</div>
</template>
