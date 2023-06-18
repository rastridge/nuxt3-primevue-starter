<template>
	<div class="form-box">
		<!-- <p v-if="suggestions">suggestions = {{ suggestions }}</p> -->
		<!-- <p v-if="items">items = {{ items }}</p> -->

		<h5 v-if="props.id" class="text-left">
			Contributor {{ contribution_data.contribution_name }}
		</h5>

		<FormKit
			type="form"
			name="contribution"
			:value="contribution_data"
			submit-label="Submit"
			@submit="submitForm"
		>
			<div v-if="!props.id">
				<AutoComplete
					v-model="selectedItem"
					optionLabel="title"
					:suggestions="filteredNames"
					@complete="search"
					@item-select="getPrevious"
				/>
			</div>

			<FormKit
				type="date"
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

			<FormKit
				type="checkbox"
				label="Show Name"
				name="contribution_showName"
				value="true"
			/>

			<FormKit
				type="checkbox"
				label="Show Amount"
				name="contribution_showAmount"
			/>
			<div v-if="previous">
				<h3>Previous Donations</h3>
				<table>
					<tbody>
						<tr v-for="(contribution_data, index) in previous" :key="index">
							<td>{{ contribution_data.name }}</td>
							<td>{{ contribution_data.contribution_amount }}</td>
							<td>
								{{ $dayjs(contribution_data.dt).format('MMM DD YYYY') }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<FormKit
				type="textarea"
				label="Comment"
				name="contribution_comment"
				validation="required"
			/>
		</FormKit>
		<Button @click="cancelForm()"> Cancel </Button>
	</div>
	<!-- </div> -->
</template>

<script setup>
	// Used by multiple components
	import '@formkit/themes/genesis'
	// import { getNode } from '@formkit/core'
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

	// Form field values
	let contribution_data = {}

	// Add form
	//
	// autocomplete
	//
	const suggestions = ref([])
	const selectedItem = ref('')
	const filteredNames = ref([])
	const previous = ref(null)

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

	const getPrevious = async () => {
		const { data, pending, error, refresh } = await useFetch(
			`/contributions/previous/${selectedItem.value.account_id}`,
			{
				method: 'get',
				headers: {
					authorization: auth.user.token,
				},
			}
		)
		previous.value = data.value
	}

	// Add
	//
	if (!props.id) {
		//
		// get suggestions
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

		contribution_data.contribution_date = $dayjs().format('YYYY-MM-DD')
		contribution_data.showName = 1
		contribution_data.showAmount = 1
	} else {
		//
		// edit
		//
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
		// Adjust for local time and Format for Formkit calendar? ??
		data.value.contribution_date = $dayjs(data.value.contribution_date).format(
			'YYYY-MM-DD'
		)
		contribution_data = data.value
	}

	//
	// form handlers
	//
	const submitForm = (state) => {
		state.account_id = selectedItem.value.account_id
		emit('submitted', state)
	}

	const cancelForm = () => {
		navigateTo('/admin/contributions') // needs to be / for self register
	}
</script>
