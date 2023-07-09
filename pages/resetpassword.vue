<template>
	<div>
		<Head>
			<Title>Admin User Request Password Reset</Title>
		</Head>
		<div class="grid">
			<div>
				<h3>Admin User Request Password Reset</h3>

				<div class="grid">
					<div class="col">
						<p>
							In a few moments instructions to reset your password will be sent
							to you at the email address associated with this username
						</p>
						<FormKit
							type="form"
							submit-label="Submit"
							@submit="handleSubmit(state)"
						>
							<FormKit
								label="Username"
								name="username"
								type="text"
								v-model="username"
								validation="required"
							/>
						</FormKit>

						<div class="mb-3">
							<Button
								class="p-button-danger"
								label="Cancel"
								@click="cancelForm()"
							>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import '@formkit/themes/genesis'

	// initialize formkit state
	const username = ref('')

	//
	// form actions
	//
	const cancelForm = () => {
		navigateTo('/loginpage')
	}
	const handleSubmit = async function () {
		const { data, error } = await useFetch('/users/resetrequest', {
			method: 'POST',
			body: { username },
			headers: {
				authorization: 'not-needed',
			},
		})
		navigateTo('/loginpage')
	}
</script>
