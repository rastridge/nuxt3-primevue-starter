<script setup>
	// import { useAuthStore } from '~/stores/authStore'
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	// const auth = useAuthStore()
	const { onSubmitAdd } = useSubmit()

	definePageMeta({ layout: 'admin' })
	const saving = ref(false)

	//
	// Users form action
	//
	const onSubmit = function (form_state) {
		saving.value = true
		onSubmitAdd('users', form_state)
		saving.value = false
		navigateTo(`/admin/users`)
	}
	/* 	const onSubmit = async function (state) {
		const { data, error } = await useFetch('/users/addone', {
			method: 'post',
			body: state,
			headers: {
				authorization: auth.user.token,
			},
		})
		if (data.value.message) {
			alert.error(data.value.message)
		} else {
			navigateTo('/admin/users')
		}
	} */
</script>

<template>
	<div>
		<Head>
			<Title>Add User</Title>
		</Head>
		<common-header title="Add User" />
		<user-form @submitted="onSubmit" />
	</div>
</template>

<style scoped></style>
