<template>
	<div id="events">
		<div class="center-content">
			<common-header title="Events" />
		</div>
		<div>
			<Card v-for="item in events" :key="item.id" class="shadow-6 m-2 p-2">
				<template #header>
					{{ $dayjs(item.dt).format('MMM D, YYYY HH:mm a') }}</template
				>
				<template #subtitle> {{ item.title }}</template>
				<template #content
					>{{ item.event_description }} LOCATION:
					{{ item.event_location }}</template
				>
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
		data: events,
		pending,
		error,
		refresh,
	} = await useFetch('/events/getallcurrent', {
		method: 'get',
		headers: {
			authorization: 'not-needed',
		},
	})
</script>

<!-- <style scoped>
	.card-container::v-deep .p-card {
		padding: 1rem;
		margin-top: 1rem;
		box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.12),
			0px 4px 5px rgba(0, 0, 0, 0.14), 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
	}
</style> -->
