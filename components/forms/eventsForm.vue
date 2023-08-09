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
				label="Event Name"
				name="event_title"
				type="text"
				validation="required"
			/>
			<FormKit
				label="Description"
				name="event_description"
				type="textarea"
				validation="required"
			/>
			<FormKit
				label="Location"
				name="event_location"
				type="textarea"
				validation="required"
			/>

			<FormKit
				type="date"
				label="Event Date"
				name="event_dt"
				validation="required"
			/>
			{{ state.event_dt }}
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

	const { $dayjs } = useNuxtApp()
	const saving = ref(false)

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
	state.value.event_dt = dt.add(7, 'day').format('YYYY-MM-DD')
	state.value.expire_dt = dt.add(28, 'day').format('YYYY-MM-DD')

	//
	// edit if there is an id - add if not
	//
	if (props.id !== 0) {
		//
		// Initialize Edit form
		//
		const {
			data: events_data,
			pending,
			error,
			refresh,
		} = await useFetch(`/events/${props.id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		state.value = events_data.value

		// Adjust for local time and Format for Primevue calendar
		state.value.event_dt = $dayjs(events_data.value.event_dt).format(
			'YYYY-MM-DD'
		)
		state.value.release_dt = $dayjs(events_data.value.release_dt).format(
			'YYYY-MM-DD'
		)
		state.value.expire_dt = $dayjs(events_data.value.expire_dt).format(
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
		navigateTo('/admin/events') // needs to be / for self register
	}
</script>
