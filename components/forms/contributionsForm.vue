<template>
	<div class="form-box">
		<h5 v-if="props.id" class="text-left">
			Contributor {{ state.contribution_name }}
		</h5>
		<div v-else>
			<Card style="width: 20em; margin-bottom: 1rem">
				<template #title> Contributor</template>
				<template #content>
					<AutoComplete
						v-model="selectedItem"
						optionLabel="title"
						:suggestions="filteredNames"
						@complete="search"
						@item-select="getPrevious"
					/>
				</template>
			</Card>
		</div>
		<FormKit
			type="form"
			:config="{ validationVisibility: 'live' }"
			v-model="state"
			submit-label="Submit"
			@submit="submitForm"
		>
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
				value="1"
			/>

			<FormKit
				type="checkbox"
				label="Show Amount"
				name="contribution_showAmount"
				value="1"
			/>
			<div v-if="previous">
				<h3>Previous Donations</h3>
				<table>
					<tbody>
						<tr v-for="(items, index) in previous" :key="index">
							<td>{{ items.name }}</td>
							<td>{{ items.contribution_amount }}</td>
							<td>
								{{ $dayjs(items.dt).format('MMM DD YYYY') }}
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
		<Button label="Cancel" @click="cancelForm()"> </Button>
	</div>
	<!-- </div> -->
</template>

<script setup>
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

	const state = ref({})

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
		//
		// initialize add form
		//
		state.value.contribution_date = $dayjs().format('YYYY-MM-DD')
		state.value.contribution_showName = true
		state.value.contribution_showAmount = true
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
		state.value = data.value
		// Adjust for local time and Format for Formkit calendar? ??
		state.value.contribution_date = $dayjs(data.value.contribution_date).format(
			'YYYY-MM-DD'
		)
		state.value.contribution_showName = data.value.contribution_showName
			? true
			: false
		state.value.contribution_showAmount = data.value.contribution_showAmount
			? true
			: false
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
