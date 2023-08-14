<script setup>
	const { onSubmitAdd } = useSubmit()

	// Sponsors form action
	//
	const onSubmit = async function (state) {
		await onSubmitAdd('sponsors', state)
		navigateTo(`/admin/sponsors`)
	}
</script>

<template>
	<div>
		<Head>
			<Title> Add sponsors</Title>
		</Head>
		<admin-header title="Add sponsors" />
		<sponsors-form @submitted="onSubmit" />
	</div>
</template>
