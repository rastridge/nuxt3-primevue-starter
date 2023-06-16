<template>
	<div class="form-box">
		<!-- <p v-if="suggestions">suggestions = {{ suggestions }}</p> -->
		<!-- <p v-if="items">items = {{ items }}</p> -->

		<h5 v-if="props.id" class="text-left">
			Contributor {{ item.contribution_name }} {{ props.id }}
		</h5>

		<FormKit
			type="form"
			name="contribution"
			:value="item"
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
						<tr v-for="(item, index) in previous" :key="index">
							<td>{{ item.name }}</td>
							<td>{{ item.contribution_amount }}</td>
							<td>
								{{ $dayjs(item.dt).format('MMM DD YYYY') }}
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
	let item = {}

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

		item.contribution_date = $dayjs().format('YYYY-MM-DD HH:mm')
		item.showName = 1
		item.showAmount = 1
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
			'YYYY-MM-DD HH:mm'
		)
		item = data.value
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
