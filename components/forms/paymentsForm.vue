<template>
	<div>
		<FormKit
			type="form"
			:config="{ validationVisibility: 'live' }"
			v-model="state"
			submit-label="Submit"
			@submit="submitForm(state)"
		>
			<FormKit
				label="Payment Name"
				name="payment_title"
				type="text"
				validation="required"
			/>
			<FormKit
				label="Payment Description"
				name="payment_description"
				type="textarea"
				validation="required"
			/>
			<FormKit
				label="Paypal Code"
				name="payment_paypal_button"
				type="textarea"
				validation="required"
			/>

			<!-- 	<FormKit
				type="date"
				label="Event Date"
				name="payment_dt"
				validation="required"
			/> -->
			<FormKit
				type="date"
				label="Release Date"
				name="release_dt"
				validation="required"
			/>

			<FormKit
				type="date"
				label="Expire Date"
				name="expire_dt"
				validation="required"
			/>
		</FormKit>
		<p v-if="saving" class="text-2xl"><ProgressSpinner /> Saving ...</p>

		<Button label="Cancel" @click.prevent="cancelForm()"> </Button>
	</div>
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
	const saving = ref(false)

	const { $dayjs } = useNuxtApp()
	//
	// Outgoing
	//
	const emit = defineEmits(['submitted'])
	//
	// Incoming
	//
	const props = defineProps({
		id: { Number, default: 0 },
	})

	//
	// Initialize Add form
	//
	let state = ref({})

	const dt = $dayjs()
	state.value.release_dt = dt.format('YYYY-MM-DD')
	state.value.expire_dt = dt.add(28, 'day').format('YYYY-MM-DD')

	//
	// edit if there is an id - add if not
	//
	if (props.id !== 0) {
		//
		// Initialize Edit form
		//
		const {
			data: payments_data,
			pending,
			error,
			refresh,
		} = await useFetch(`/payments/${props.id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		state.value = payments_data.value

		// Adjust for local time and Format for Primevue calendar
		state.value.release_dt = $dayjs(payments_data.value.release_dt).format(
			'YYYY-MM-DD'
		)
		state.value.expire_dt = $dayjs(payments_data.value.expire_dt).format(
			'YYYY-MM-DD'
		)
	}
	//
	// form handlers
	//
	const submitForm = (state) => {
		saving.value = true
		emit('submitted', state)
	}

	const cancelForm = () => {
		navigateTo('/admin/payments') // needs to be / for self register
	}
</script>
