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
			<Title> Add Opponent {{ id }}</Title>
		</Head>
		<common-header title="Add Opponent" />
		<opponents-form :id="id" @submitted="onSubmit" />
	</div>
</template>
