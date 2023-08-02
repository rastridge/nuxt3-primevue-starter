<template>
	<div id="payments">
		<div class="center-content">
			<common-header title="Payments" />
		</div>
		<div class="flex flex-wrap align-items-center justify-content-center">
			<Card
				v-for="item in payments"
				:key="item.id"
				style="width: 320px"
				class="shadow-6 m-2 p-3"
			>
				<template #header> {{ item.title }}</template>
				<template #subtitle></template>
				<template #content>
					<span v-html="item.payment_paypal_button"></span
				></template>
			</Card>
		</div>
	</div>
</template>

<script setup>
	const { $dayjs } = useNuxtApp()

	//
	// Get current news
	//
	const {
		data: payments,
		pending,
		error,
		refresh,
	} = await useFetch('/payments/getallcurrent', {
		method: 'get',
		headers: {
			authorization: 'not-needed',
		},
	})
</script>
