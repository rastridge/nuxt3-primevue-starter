<template>
	<div class="form-box">
		<!-- <p v-if="suggestions">suggestions = {{ suggestions }}</p> -->
		<p v-if="items">items = {{ items }}</p>

		<h5 class="text-left">Contributor {{ item.contribution_name }}</h5>

		<FormKit
			type="form"
			name="contribution"
			#default="{ value }"
			:value="item"
			submit-label="Submit"
			@submit="submitForm"
		>
			<div v-if="props.id == ''">
				<AutoComplete
					v-model="selectedItem"
					optionLabel="title"
					:suggestions="filteredNames"
					@complete="search"
				/>
				selectedItem.account_id = {{ selectedItem.account_id }}
			</div>
			<FormKit
				type="datetime-local"
				label="Contribution Date"
				name="contribution_date"
				validation="required"
			/>

			<FormKit
				label="Amount"
				name="contribution_amount"
				type="text"
				validation="required"
			/>

			<FormKit type="checkbox" label="Show Name" name="contribution_showName" />

			<FormKit
				type="checkbox"
				label="Show Amount"
				name="contribution_showAmount"
			/>

			<FormKit
				type="textarea"
				label="Comment"
				name="contribution_comment"
				validation="required"
			/>
			<pre wrap> value {{ value }}</pre>
			<pre wrap> state {{ state }}</pre>
		</FormKit>
		<Button @click="cancelForm()"> Cancel </Button>
	</div>
	<!-- </div> -->
</template>

<script setup>
	import '@formkit/themes/genesis'
	import { getNode } from '@formkit/core'

	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()

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
	// Initialize form sub function
	//
	let item = {}
	//
	const populateForm = async () => {
		const { data, pending, error, refresh } = await useFetch(
			`/contributions/${props.id}`,
			{
				key: props.id,
				method: 'get',
				headers: {
					authorization: auth.user.token,
				},
			}
		)
		// // Adjust for local time and Format for Formkit calendar
		data.value.contribution_date = $dayjs(data.value.contribution_date).format(
			'YYYY-MM-DD HH:mm'
		)
		return data
	}

	//
	// autocomplete
	//
	const suggestions = ref([])
	const selectedItem = ref('')
	const filteredNames = ref([])

	if (props.id == '') {
		const { data, pending, error, refresh } = await useFetch(
			`/accounts/suggestions`,
			{
				key: props.id,
				method: 'get',
				headers: {
					authorization: auth.user.token,
				},
			}
		)
		suggestions.value = data.value
	}

	const search = (event) => {
		if (!event.query.trim().length) {
			filteredNames.value = [...suggestions.value]
		} else {
			filteredNames.value = suggestions.value.filter((suggestion) => {
				return (
					suggestion.title
						.toLowerCase()
						// .startsWith(event.query.toLowerCase())
						.includes(event.query.toLowerCase())
				)
			})
		}
	}

	//
	// Initialize form for add
	//
	const dt = $dayjs()
	item.contribution_date = dt.format('YYYY-MM-DD HH:mm')

	//
	// edit if there is an id - add if not
	//
	if (props.id !== 0) {
		// Set input values
		item = await populateForm()
	}

	//
	// form handlers
	//
	const submitForm = (state) => {
		state.account_id = selectedItem.value.account_id
		alert({ state })
		emit('submitted', state)
	}

	const cancelForm = () => {
		navigateTo('/admin/contributions') // needs to be / for self register
	}
</script>
