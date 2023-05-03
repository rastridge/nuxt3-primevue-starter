<script setup>
	const { onSubmitEdit } = useSubmit()

	//
	// Get account id to edit
	//
	const route = useRoute()
	const id = ref(route.params.id)
	//
	// Accounts form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitEdit('accounts', form_state)
		navigateTo(`/admin/accounts/men`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit Account {{ id }}</Title>
		</Head>
		<common-header title="Edit account" />
		<accounts-form :id="id" @submitted="onSubmit" />
	</div>
</template>
