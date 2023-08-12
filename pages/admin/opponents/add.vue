<script setup>
	const { onSubmitAdd } = useSubmit()

	// Opponents form action
	//
	const onSubmit = async function (state) {
		await onSubmitAdd('opponents', state)
		navigateTo(`/admin/opponents`)
	}
</script>

<template>
	<div>
		<Head>
			<Title> Add Opponent</Title>
		</Head>
		<admin-header title="Add Opponent" />
		<opponents-form @submitted="onSubmit" />
	</div>
</template>
