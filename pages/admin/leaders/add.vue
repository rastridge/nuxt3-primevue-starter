<script setup>
	const { onSubmitAdd } = useSubmit()

	// Sponsors form action
	//
	const onSubmit = async function (state) {
		await onSubmitAdd('leaders', state)
		navigateTo(`/admin/leaders`)
	}
</script>

<template>
	<div>
		<Head>
			<Title> Add leaders</Title>
		</Head>
		<admin-header title="Add leaders" />
		<leaders-form @submitted="onSubmit" />
	</div>
</template>
