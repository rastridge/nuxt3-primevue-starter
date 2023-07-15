<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()
	const saving = ref(false)

	//
	// News form action
	//
	const onSubmit = async function (form_state) {
		saving.value = true

		await onSubmitAdd('news', form_state)
		saving.value = false

		navigateTo(`/admin/news`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add News Item</Title>
		</Head>
		<common-header title="Add News item" />
		<p v-if="saving" class="text-center text-2xl">
			<ProgressSpinner /> Saving ...
		</p>

		<news-form @submitted="onSubmit" />
		<p v-if="saving" class="text-center text-2xl">
			<ProgressSpinner /> Saving ...
		</p>
	</div>
</template>

<style scoped></style>
