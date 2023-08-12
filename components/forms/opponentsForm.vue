<template>
	<div>
		<FormKit
			type="form"
			:config="{ validationVisibility: 'live' }"
			v-model="state"
			submit-label="Submit Opponent"
			@submit="submitForm(state)"
		>
			<FormKit
				label="Opponent Name"
				name="opponent_name"
				type="text"
				validation="required"
			/>

			<FormKit
				label="Opponent Location"
				name="opponent_location"
				type="text"
				validation="required"
			/>

			<FormKit
				type="select"
				label="Opponent Type"
				name="opponent_type"
				:options="[
					{ label: 'Men', value: 'men' },
					{ label: 'College', value: 'college' },
					{ label: 'Old Boys', value: 'oldboys' },
				]"
				validation="required"
			/>

			<FormKit
				type="select"
				label="Opponent level"
				name="opponent_level"
				:options="[
					{ label: 'First Side', value: 'A' },
					{ label: 'Second Side', value: 'B' },
					{ label: 'Third  Side', value: 'C' },
				]"
				validation="required"
			/>

			<FormKit
				label="Opponent Description"
				name="opponent_description"
				type="textarea"
				validation="required"
			/>
		</FormKit>
		<p v-if="saving" class="text-2xl"><ProgressSpinner /> Saving ...</p>

		<Button label="Cancel" @click="cancelForm()"> </Button>
	</div>
	<!-- </div> -->
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
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
	// Initialize form
	//
	let state = ref({})

	//
	// edit if there is an id - add if not
	//
	if (props.id !== 0) {
		// get opponent with id === props.id
		const {
			data: opponents_data,
			pending,
			error,
			refresh,
		} = await useFetch(`/opponents/${props.id}`, {
			key: props.id,
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		state.value = opponents_data.value
	}

	//
	// form handlers
	//
	const submitForm = (state) => {
		saving.value = true

		emit('submitted', state)
	}

	const cancelForm = () => {
		navigateTo('/admin/opponents')
	}
</script>
