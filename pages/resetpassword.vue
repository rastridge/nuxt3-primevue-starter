<template>
	<div>
		<Head>
			<Title>Admin User Request Password Reset</Title>
		</Head>
		<div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
			<div class="text-center mb-5">
				<div class="text-900 md:text-2xl font-medium mb-3">
					Admin User Request Password Reset
				</div>
				<div class="text-500 md:text-xl font-medium mb-3">
					In a few moments instructions to reset your password will be sent to
					you at the email address associated with this username
				</div>
			</div>

			<!-- 			xxx old xxx
			<form>
				<label for="username" class="block text-900 font-medium mb-2"
					>Username</label
				>
				<InputText
					id="username"
					type="text"
					v-model="username"
					class="w-full mb-3"
				/>
			</form>
			<Button
				label="Submit"
				icon="pi pi-user"
				class="w-50 mr-3"
				@click="handleSubmit"
			></Button>
			<Button label="Cancel" class="w-50" @click="cancelForm()"></Button> -->

			<FormKit type="form" submit-label="Request" @submit="handleSubmit">
				<FormKit type="text" name="username" label="Username"> </FormKit>
			</FormKit>
			<Button label="Cancel" class="small w-50" @click="cancelForm()"></Button>
		</div>
	</div>
</template>

<script setup>
	// initialize formkit state
	const username = ref('')

	//
	// form actions
	//
	const cancelForm = () => {
		navigateTo('/loginpage')
	}
	const handleSubmit = async function (state) {
		const username = state.username
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
