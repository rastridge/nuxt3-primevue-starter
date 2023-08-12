<template>
	<div>
		<p v-if="!memberTypeOptions || !memberAdminTypeOptions || !state">
			<ProgressSpinner /> Loading
		</p>
		<div v-else class="form-box">
			<p v-if="alert.message" class="alert-danger">
				ERROR: {{ alert.message }}
			</p>
			<FormKit
				type="form"
				:config="{ validationVisibility: 'live' }"
				v-model="state"
				submit-label="Submit member"
				@submit="submitForm"
			>
				<FormKit
					label="First Name"
					name="member_firstname"
					type="text"
					validation="required"
				/>
				<FormKit
					label="Last Name"
					name="member_lastname"
					type="text"
					validation="required"
				/>
				<FormKit
					type="email"
					label="Email address"
					name="account_email"
					validation="required|email"
					:errors="errors"
				/>

				<FormKit
					type="number"
					label="Year joined"
					name="member_year"
					min="1966"
					step="1"
				/>
				<FormKit
					type="text"
					label="Street"
					name="account_addr_street"
					validation="required"
				/>
				<FormKit
					type="text"
					label="Street Ext"
					name="account_addr_street_ext"
				/>
				<FormKit
					type="text"
					label="City"
					name="account_addr_city"
					validation="required"
				/>
				<FormKit
					type="select"
					label="Country"
					name="account_addr_country"
					id="account_addr_country"
					:options="justCountries"
					validation="required"
				/>
				<FormKit
					type="select"
					label="Region"
					name="account_addr_state"
					id="account_addr_state"
					:options="justRegions"
					validation="required"
				/>
				<FormKit
					type="text"
					label="Postal Code"
					name="account_addr_postal"
					validation="required"
				/>
				<FormKit
					type="tel"
					label="Phone number"
					name="account_addr_phone"
					placeholder="+1##########"
					v-model="state.account_addr_phone"
					validation="required | matches:/^\+[1]{1}[0-9]{3}[0-9]{3}[0-9]{4}$/"
					:validation-messages="{
						matches: 'US/CA only. Must be in the format +1#########',
					}"
					validation-visibility="live"
				/>
				<FormKit
					type="select"
					label="Show phone?"
					name="member_show_phone"
					:options="[
						{ label: 'Yes', value: 1 },
						{ label: 'No', value: 0 },
					]"
				/>
				<FormKit
					type="select"
					label="Show address?"
					name="member_show_addr"
					:options="[
						{ label: 'Yes', value: 1 },
						{ label: 'No', value: 0 },
					]"
				/>
				<FormKit
					type="select"
					label="Receive newsletter?"
					name="newsletter_recipient"
					:options="[
						{ label: 'Yes', value: 1 },
						{ label: 'No', value: 0 },
					]"
				/>
				<FormKit
					type="select"
					label="Receive US Mail?"
					name="mail_recipient"
					:options="[
						{ label: 'Yes', value: 1 },
						{ label: 'No', value: 0 },
					]"
				/>
				<FormKit
					type="select"
					label="Receive SMS messages?"
					name="sms_recipient"
					:options="[
						{ label: 'Yes', value: 1 },
						{ label: 'No', value: 0 },
					]"
				/>
				<FormKit
					type="select"
					label="Member type"
					placeholder="Select member type"
					name="member_type_id"
					:options="memberTypeOptions"
					validation="required"
				/>
				<FormKit
					type="select"
					label="Member Administrator role"
					placeholder="Select admin type"
					name="member_admin_type_id"
					:options="memberAdminTypeOptions"
					validation="required"
				/>
			</FormKit>
			<p v-if="saving" class="text-2xl"><ProgressSpinner /> Saving ...</p>

			<Button class="mb-3 center" label="Cancel" @click="cancelForm"> </Button>
		</div>
	</div>
</template>

<script setup>
	import { getNode } from '@formkit/core'
	import ProgressSpinner from 'primevue/progressspinner'
	import { useAuthStore } from '~/stores/authStore'
	import { useAlertStore } from '~/stores/alertStore'
	const auth = useAuthStore()
	const alert = useAlertStore()
	const { $dayjs } = useNuxtApp()
	const { getCountries, setRegions } = useLocations()
	const { getMemberAdminTypeOptions, getMemberTypeOptions } = useMembertypes()
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
	// initialize form for add
	//
	const state = ref({})

	state.value.member_year = $dayjs().format('YYYY')
	state.value.account_addr_phone = '+1716'
	state.value.member_show_phone = '1'
	state.value.account_addr_state = 'NY'
	state.value.account_addr_street_ext = ''
	state.value.account_addr_country = 'US'
	state.value.member_show_addr = '1'
	state.value.newsletter_recipient = '1'
	state.value.mail_recipient = '0'
	state.value.sms_recipient = '1'

	//
	// edit if there is an id - add if not
	//
	if (props.id !== 0) {
		//
		// Initialize Edit form
		//
		const {
			data: formdata,
			pending,
			error,
			refresh,
		} = await useFetch(`/accounts/${props.id}`, {
			key: props.id,
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		state.value = formdata.value
	}
	//
	// create coutry and region options formatted for Formkit
	const justCountries = ref(getCountries())
	// justCountries.value = getCountries()

	const justRegions = ref(setRegions(state.value.account_addr_country))
	// set regions for initial country
	// justRegions.value = setRegions(state.value.account_addr_country)

	//
	// get member types for options formatted for Formkit
	//
	const memberAdminTypeOptions = await getMemberAdminTypeOptions()
	const memberTypeOptions = await getMemberTypeOptions()

	//
	// form handlers
	//
	const submitForm = (state) => {
		saving.value = true
		emit('submitted', state)
	}
	const cancelForm = () => {
		navigateTo('/admin/accounts/men') // needs to be / for self register
	}
	//
	// errors
	//
	const errors = computed(() => {
		return alert.message !== null
			? ['Account with this email already exists']
			: ['']
	})

	//
	// FormKit stuff
	// Region depends on country
	onMounted(() => {
		// Use the IDs of the inputs you want to get
		const countryNode = getNode('account_addr_country')
		const stateNode = getNode('account_addr_state')

		// Here we are listening for the 'commit' event
		countryNode.on('commit', ({ payload }) => {
			// We update the value of the regions
			justRegions.value = setRegions(payload)
		})
	})
</script>
