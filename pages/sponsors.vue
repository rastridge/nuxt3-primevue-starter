<template>
	<div id="sponsors">
		<div class="center-content">
			<common-header title="Sponsors" />
		</div>
		<div>
			<Card v-for="item in sponsors" :key="item.id" class="shadow-6 m-2 p-2">
				<template #header> {{ item.title }}</template>
				<template #subtitle> {{ item.ad_client_name }}</template>
				<template #content> <Image :src="item.ad_image_path" /></template>
			</Card>
		</div>
	</div>
</template>

<script setup>
	//
	// Get current sponsors
	//
	const {
		data: sponsors,
		pending,
		error,
		refresh,
	} = await useFetch('/sponsors/getallcurrent', {
		method: 'get',
		headers: {
			authorization: 'not-needed',
		},
	})
</script>
