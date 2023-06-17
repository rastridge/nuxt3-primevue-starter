<script setup>
	const { onSubmitEdit } = useSubmit()

	//
	// Get opponent id
	//
	const route = useRoute()
	const id = ref(route.params.id)
	//
	// Opponents form action
	//
	const onSubmit = async function (state) {
		await onSubmitEdit('opponents', state)
		navigateTo(`/admin/opponents`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit Opponent {{ id }}</Title>
		</Head>
		<common-header title="Edit Newsletter" />
		<opponents-form :id="id" @submitted="onSubmit" />
	</div>
</template>
