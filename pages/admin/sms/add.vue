<script setup>
	import Swal from 'sweetalert2'
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { addSMS } = useSMS()

	//
	// SMS form action
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
				addSMS(state, 'sendNow')
				Swal.fire('Saved and Sent', '', 'success')
			} else if (result.isDenied) {
				addSMS(state, 'sendLater')
				Swal.fire('Saved', '', 'success')
			} else if (result.isDismissed) {
				// this.submitStatus = ''
			}
		})
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add SMS</Title>
		</Head>
		<admin-header title="Add SMS" />
		<sms-form @submitted="onSubmit" />
	</div>
</template>

<style lang="scss" scoped>
	@import 'sweetalert2/src/sweetalert2.scss';
</style>
