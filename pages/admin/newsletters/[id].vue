<script setup>
	import Swal from 'sweetalert2'
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { editNewsletter } = useNewsletter()

	//
	// Get news item id
	//
	const route = useRoute()
	const id = ref(route.params.id)
	//
	// Newsletters form action
	//
	const onSubmit = async function (state) {
		Swal.fire({
			title: 'What to do?',
			showDenyButton: true,
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonText: `Send now`,
			denyButtonText: `Send later`,
		}).then((result) => {
			if (result.isConfirmed) {
				editNewsletter(state, 'sendNow')
				Swal.fire('Saved and Sent', '', 'success')
				// navigateTo('/admin/newsletters')
			} else if (result.isDenied) {
				editNewsletter(state, 'sendLater')
				Swal.fire('Saved', '', 'success')
				// navigateTo('/admin/newsletters')
			} else if (result.isDismissed) {
				// navigateTo('/admin/newsletters')
			}
			navigateTo('/admin/newsletters')
		})
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit Newsletter {{ id }}</Title>
		</Head>
		<common-header title="Edit Newsletter" />
		<newsletters-form :id="id" @submitted="onSubmit" />
	</div>
</template>

<style lang="scss" scoped>
	@import 'sweetalert2/src/sweetalert2.scss';
</style>
