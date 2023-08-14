<template>
	<div>
		<p v-if="id">
			Current version of newsletter was opened {{ newsletter_opened_cnt }} times
		</p>
		<FormKit
			type="form"
			:config="{ validationVisibility: 'live' }"
			v-model="state"
			submit-label="Submit Newsletter"
			@submit="submitForm"
		>
			<FormKit
				type="select"
				label="Recipient Group"
				placeholder="Select Recipient Group"
				name="newsletter_recipient_type_id"
				:options="newsletterRecipientTypeOptions"
				validation="required"
			/>

			<FormKit
				label="Newsletter subject"
				name="newsletter_subject"
				type="text"
				validation="required"
			/>
			<FormKit
				v-if="peek"
				label="Raw HTML newsletter_body_html"
				name="newsletter_body_html"
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
				:field="state.newsletter_body_html"
				@changeState="changeState"
			></input-body>
		</FormKit>

		<p v-if="saving" class="text-2xl"><ProgressSpinner /> Saving ...</p>

		<Button class="m-1" label="Cancel" @click.prevent="cancelForm()"> </Button>
	</div>
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
	const saving = ref(false)

	//
	// Incoming i
	//
	const props = defineProps({
		id: { Number, default: 0 },
	})
	//
	// incoming from inputBody component
	//
	const changeState = (field) => {
		state.value.newsletter_body_html = field
	}

	//
	// Outgoing form data
	//
	const emit = defineEmits(['submitted'])

	//
	// raw html view
	const peek = ref(false)
	const toggle = () => {
		peek.value = !peek.value
	}
	//
	// Formkit initial state
	//
	let state = ref({})
	state.value.newsletter_recipient_type_id = 9
	state.value.newsletter_id = ''
	state.value.newsletter_body_html = ''
	state.value.newsletter_body_text = ''
	state.value.newsletter_subject = ''
	state.value.admin_user_id = auth.user.admin_user_id

	//
	//
	//
	const newsletter_opened_cnt = ref(0)
	//
	// Editing if there is an id - Adding if not
	//
	if (props.id !== 0) {
		//
		// assign existing data to Edit form
		//
		const {
			data: news_data,
			pending,
			error,
			refresh,
		} = await useFetch(`/newsletters/${props.id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})

		state.value = news_data.value

		newsletter_opened_cnt.value = news_data.value.newsletter_opened_cnt
	}
	//
	// form handlers
	//
	const submitForm = (state) => {
		saving.value = true
		emit('submitted', state)
	}

	const cancelForm = () => {
		navigateTo('/admin/newsletters')
	}
	//
	// get newletter recipient types for Dropdown
	//
	const { data: newsletterRecipientTypes } = await useFetch(
		'/newsletters/newsletterrecipienttypes',
		{
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		}
	)
	//
	// convert for Formkit "label" "value"
	//
	const setNewsletterRecipientTypeOptions = (nltypes) => {
		let result = []
		nltypes.map((old) => {
			let n = {}
			n.label = old.newsletter_recipient_type
			n.value = old.newsletter_recipient_type_id
			result.push(n)
		})
		return result
	}
	const newsletterRecipientTypeOptions = setNewsletterRecipientTypeOptions(
		newsletterRecipientTypes.value
	)
</script>
