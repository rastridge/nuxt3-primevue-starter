<script setup>
	const { onSubmitEdit } = useSubmit()

	//
	// Get sponsor id
	//
	const route = useRoute()
	const id = ref(route.params.id)
	//
	// leaders form action
	//
	const onSubmit = async function (state) {
		await onSubmitEdit('leaders', state)
		navigateTo(`/admin/leaders`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit Sponsor {{ id }}</Title>
		</Head>
		<admin-header title="Leaders" />
		<leaders-form :id="id" @submitted="onSubmit" />
	</div>
</template>
