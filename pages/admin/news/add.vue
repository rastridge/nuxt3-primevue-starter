<script setup>
	// import { useAuthStore } from '~/stores/authStore'
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	// const auth = useAuthStore()
	const { onSubmitAdd } = useSubmit()
	const saving = ref(false)

	//
	// News form action
	//
	const onSubmit = function (form_state) {
		onSubmitAdd('news', form_state)
		navigateTo(`/admin/news`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add News Item</Title>
		</Head>
		<common-header title="Add News item" />
		<news-form @submitted="onSubmit" />
	</div>
</template>

<style scoped></style>
