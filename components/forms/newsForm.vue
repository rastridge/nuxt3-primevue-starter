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
				label="News Title"
				name="news_title"
				type="text"
				validation="required"
			/>
			<FormKit
				label="Synopsis"
				name="news_synop"
				type="textarea"
				validation="required"
			/>
			<FormKit
				v-if="peek"
				label="Raw HTML Article"
				name="news_article"
				type="textarea"
				disabled="true"
			/>
			<Button
				label="Toggle raw HTML view"
				class="p-button-secondary mb-1"
				@click="toggle"
			/>

			<h4>Content</h4>
			<input-body
				:field="state.news_article"
				@changeState="changeState"
			></input-body>

			<FormKit
				type="date"
				label="Event Date"
				name="news_event_dt"
				validation="required"
			/>
			<FormKit
				type="date"
				label="Release Date"
				name="news_release_dt"
				validation="required"
			/>

			<FormKit
				type="date"
				label="Expire Date"
				name="news_expire_dt"
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
	// incoming from inputBody component
	//
	const changeState = (field) => {
		state.value.news_article = field
	}

	//
	// raw html view
	//
	const peek = ref(false)
	const toggle = () => {
		peek.value = !peek.value
	}

	//
	// Initialize Add form
	//
	let state = ref({})
	state.value.news_article = 'Enter news here'
	const dt = $dayjs()
	state.value.news_release_dt = dt.format('YYYY-MM-DD')
	state.value.news_event_dt = dt.add(7, 'day').format('YYYY-MM-DD')
	state.value.news_expire_dt = dt.add(28, 'day').format('YYYY-MM-DD')

	//
	// edit if there is an id - add if not
	//
	if (props.id !== 0) {
		//
		// Initialize Edit form
		//
		const {
			data: news_data,
			pending,
			error,
			refresh,
		} = await useFetch(`/news/${props.id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		state.value = news_data.value

		// Adjust for local time and Format for Primevue calendar
		state.value.news_event_dt = $dayjs(news_data.value.news_event_dt).format(
			'YYYY-MM-DD'
		)
		state.value.news_release_dt = $dayjs(
			news_data.value.news_release_dt
		).format('YYYY-MM-DD')
		state.value.news_expire_dt = $dayjs(news_data.value.news_expire_dt).format(
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
		navigateTo('/admin/news') // needs to be / for self register
	}
</script>
