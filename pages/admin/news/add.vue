<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	//
	// News form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('news', form_state)
		navigateTo(`/admin/news`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add News Item</Title>
		</Head>
		<admin-header title="Add News item" />
		<news-form @submitted="onSubmit" />
	</div>
</template>

<style scoped></style>
