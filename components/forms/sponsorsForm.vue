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
				label="Sponsor Name"
				name="ad_client_name"
				type="text"
				validation="required"
			/>

			<FormKit
				label="Sponsor contact"
				name="ad_client_contact"
				type="text"
				validation="required"
			/>

			<FormKit
				label="Sponsor email"
				name="ad_client_email"
				type="text"
				validation="required"
			/>

			<FormKit
				label="Sponsor phone"
				name="ad_client_phone"
				type="text"
				validation="required"
			/>

			<FormKit
				label="Website"
				name="ad_client_website"
				type="text"
				validation="required"
			/>

			<!-- ad image file upload -->
			<p>Image must be 750w 125h 72dpi</p>
			<label for="ad_image">Add or Replace Advert image file</label><br />
			<input ref="fileInput" type="file" @change="handleFileUpload()" />
			<br />
			<br />
			<br />
			<!-- image file  -->
			<div>
				<label for="ad_image_path">Current image filepath</label><br />
				<input
					v-model="state.ad_image_path"
					id="ad_image_path"
					name="ad_image_path"
					disabled
					type="text"
					style="width: 100%"
				/>
				<div class="card flex justify-content-center">
					<Image :src="state.ad_image_path" alt="Image" width="320" />
				</div>
			</div>
		</FormKit>

		<p v-if="saving" class="text-2xl"><ProgressSpinner /> Saving ...</p>

		<Button label="Cancel" @click="cancelForm()"> </Button>

		<!-- Modal -->
		<Dialog
			v-model:visible="displayModal"
			:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
			:style="{ width: '50vw' }"
		>
			<template #header>
				<div class="my-dialog-header">
					<h3>Processing file</h3>
				</div></template
			>
			<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
		</Dialog>
	</div>
	<!-- </div> -->
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	import oldblue from '~/assets/imgs/2023_old_blue_dannish.jpg'

	const auth = useAuthStore()
	const saving = ref(false)
	const fileInput = ref(null)
	const image = ref('')
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
		const { data, pending, error, refresh } = await useFetch(
			`/sponsors/${props.id}`,
			{
				key: props.id,
				method: 'get',
				headers: {
					authorization: auth.user.token,
				},
			}
		)
		state.value = data.value
	}

	//
	// progress modal
	//
	const displayModal = ref(false)
	const openProgressModal = () => {
		displayModal.value = true
	}
	const closeProgressModal = () => {
		displayModal.value = false
	}

	const handleFileUpload = async () => {
		const input = fileInput.value

		const file = fileInput.value.files[0]
		// console.log('IN handleFileUpload file = ', file)
		const photoUrl = URL.createObjectURL(file)
		const image = new Image()
		const imageDimensions = await new Promise((resolve) => {
			image.onload = () => {
				const dimensions = {
					height: image.height,
					width: image.width,
				}
				resolve(dimensions)
			}
			image.src = photoUrl
		})
		// console.log(imageDimensions)

		if (imageDimensions.height === 125 && imageDimensions.width === 750) {
			const formData = new FormData()
			formData.append('file', file)
			openProgressModal()
			// upload to media.my-test-site.net
			// Find server code in folder Nuxt3-brc-media-api
			const res = await fetch(`https://media.my-test-site.net/images/upload`, {
				method: 'POST',
				body: formData,
				headers: {
					authorization: auth.user.token,
				},
			})

			const data = await res.json()
			closeProgressModal()
			image.value = data.imageUrl
			// console.log('IN handle image.value = ', image.value)
			state.value.ad_image_path = data.imageUrl
		} else {
			alert(
				'Illegal dimensons ' +
					imageDimensions.height +
					' ' +
					imageDimensions.width
			)
		}
	}
	// }
	//
	// form handlers
	//
	const submitForm = (state) => {
		saving.value = true
		emit('submitted', state)
	}

	const cancelForm = () => {
		navigateTo('/admin/sponsors')
	}
</script>
